import { Book } from '@prisma/client'
import { prisma } from '../utils/db'

export default class Orders {
  async userOrders(email: string) {
    console.log('get it', email)
    const orders = await prisma.order.findMany({
      where: { userEmail: email },
      include: {
        books: true,
      },
    })

    return orders
  }

  async createOrder(bookIDs: string[], email: string) {
    const books = await prisma.book.findMany({
      where: {
        id: {
          in: bookIDs,
        },
      },
    })
    const total = books.reduce(
      (acc: number, book: Book) => acc + book.price
    , 0)

    const order = await prisma.order.create({
      data: {
        bookIDs,
        total,
        userEmail: email,
      }
    })

    return order
  }

  async getOrderById(id: string, email: string) {
    const order = await prisma.order.findUnique({
      where: {
        id,
        userEmail: email,
      },
    })

    return order
  }

  async getOrdersByUser(email: string) {
    const orders = await prisma.order.findMany({
      where: { userEmail: email },
      include: {
        books: true,
      },
    })

    return orders
  }
}
