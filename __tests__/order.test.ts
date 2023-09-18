import { ObjectId } from 'bson'
import { prismaMock } from '../singleton'
import OrdersService from '../src/services/orders'
const Orders = new OrdersService()
const orderId = (new ObjectId()).toString()

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
const order = {
  id: orderId,
  userEmail: 'test@test.com',
  bookIDs: books.map(book => book.id),
  books,
  total: 4599,
  createdAt: new Date(),
}

test('Should create a new order', async () => {
  prismaMock.order.create.mockResolvedValue(order)

  await expect(Orders.createOrder(books.map(book => book.id), 'test@test.com'))
})

test('Should fetch order by ID', async () => {
  prismaMock.order.findUnique.mockResolvedValue(order)

  await expect(Orders.getOrderById(orderId, 'test@test.com'))
})

test('Should get all orders from specific user', async () => {
  prismaMock.order.findMany.mockResolvedValue([order])

  await expect(Orders.userOrders('test@test.com'))
})
