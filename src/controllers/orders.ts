import { Prisma } from '@prisma/client'
import OrdersService from '@services/orders'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'

const Orders = new OrdersService()

export const userOrders = async (req: Request, res: Response) => {
  const userEmail = req.query.userEmail?.toString()

  if (!userEmail) throw createHttpError.BadRequest(`Can not list orders without a user specified`)

  try {
    const orders = await Orders.getOrdersByUser(userEmail)

    res.status(200).json(orders)
  } catch (err) {
    throw createHttpError.NotFound(`No orders found for user ${userEmail}`)
  }
}

export const create = async (req: Request, res: Response) => {
  const { bookIDs } = req.body
  const userEmail = req.headers.useremail?.toString()

  if (!userEmail) throw createHttpError.Unauthorized(`Can not create order for nonexistent user`)
  try {
    const order = await Orders.createOrder(bookIDs, userEmail)
  
    res.status(200).json(order)
  } catch (err) {
    console.error(err)
    throw createHttpError.BadRequest(`There was a problem creating the order for user ${userEmail}`)
  }
}

export const orderById = async (req: Request, res: Response) => {
  const userEmail = req.headers.useremail?.toString()

  if (!userEmail) throw createHttpError.Unauthorized(`Unauthorized access; please specify a user`)

  try {
    const order = await Orders.getOrderById(req.params.id, userEmail)
  
    res.json(order)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        throw createHttpError.NotFound(`No orders were found for ${userEmail}`)
      }
    } else {
      throw createHttpError.InternalServerError()
    }
  }
}
