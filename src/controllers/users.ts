import { Prisma } from '@prisma/client'
import UsersService from '@services/users'
import { prisma } from '@utils/db'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'

const Users = new UsersService()

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await Users.login(email, password)

  return res.status(200).json(user)
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await Users.register(email, password)

    res.status(200).json(user)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw createHttpError.Conflict(`A user with email ${email} already exists`)
      } else if (err.code === 'P2012') {
        throw createHttpError.BadRequest(`Your query must include email and password`)
      }
    }
  }
}

export const update = async (req: Request, res: Response) => {
  const data = req.body
  const userEmail = req.headers.useremail?.toString()

  if (!userEmail) throw createHttpError.BadRequest(`Can not update a non-specified user`)

  try {
    const user = await Users.update(data, userEmail)

    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    throw createHttpError.InternalServerError('There was a problem updating the user')
  }
}

export const getUser = async (req: Request, res: Response) => {
  const email = req.params.email

  if (!email) throw createHttpError.Unauthorized(`Can not pull a user without submitting valid user email`)

  try {
    const user = await Users.getUser(email)

    res.status(200).json(user)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        throw createHttpError.NotFound(`No user was found for email ${email}`)
      }
    }

    throw createHttpError.InternalServerError()
  }
}

export const userOrders = async (req: Request, res: Response) => {
  const userEmail = req.headers.useremail?.toString()

  if (!userEmail) throw createHttpError.Unauthorized(`You must pass a registered user email in order to retrieve a user's orders`)

  try {
    const orders = await Users.getUserOrders(userEmail)

    res.status(200).json(orders)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        throw createHttpError.NotFound(`No orders were found for user ${userEmail}`)
      }
    }

    throw createHttpError.InternalServerError()
  }
}
