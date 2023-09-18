import { ObjectId } from 'bson'
import { prismaMock } from '../singleton'
import BooksService from '../src/services/books'
const Books = new BooksService()

const books = [
  {
    id: (new ObjectId()).toString(),
    title: 'Call of the Wild',
    isbn: '9788838439018',
    price: 1899,
    author: 'Jack London',
    orderIDs: [],
  },
  {
    id: (new ObjectId()).toString(),
    title: 'Moby Dick',
    isbn: '9780763630188',
    price: 2700,
    author: 'Herman Melville',
    orderIDs: [],
  },
]

test('Should get all books', async () => {
  prismaMock.book.findMany.mockResolvedValue(books)

  await expect(Books.getAllBooks())
})

test('Should get book by ID', async () => {
  prismaMock.book.findUnique.mockResolvedValue(books[0])

  await expect(Books.getBookById(books[0].id))
})
