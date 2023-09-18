import { prisma } from '../utils/db'

export default class Books {
  async getAllBooks() {
    const books = await prisma.book.findMany()

    return books
  }

  async getBookById(id: string) {
    const book = await prisma.book.findUnique({
      where: { id },
    })

    return book
  }
}
