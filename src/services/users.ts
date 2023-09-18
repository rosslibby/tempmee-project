import { User } from '@prisma/client'
import { prisma } from '../utils/db'

export default class Users {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email, password }
    })

    return user
  }

  async register(email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      }
    })

    return user
  }

  async update(data: Partial<User>, email: string) {
    const user = await prisma.user.update({
      data,
      where: { email },
    })
    
    return user
  }

  async getUser(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async getUserOrders(email: string) {
    const orders = await prisma.order.findMany({
      where: { userEmail: email },
    })

    return orders
  }
}
