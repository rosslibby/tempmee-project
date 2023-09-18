import axios from 'axios'
import { ObjectId } from 'bson'
import UsersService from '../src/services/users'
import { prismaMock } from '../singleton'
const Users = new UsersService()
const userId = (new ObjectId()).toString()

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

test('Should create new user', async () => {
  const user = {
    id: userId,
    name: 'Test',
    email: 'test@test.com',
    password: 'password',
    address: {
      street: '123 Sesame Street',
      street2: '',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(Users.register('test@test.com', 'password')).resolves.toMatchObject(
    expect.objectContaining({
      email: 'test@test.com',
      password: 'password',
    })
  )
})

test('Should update a user\'s details', async () => {
  const user = {
    id: userId,
    name: 'Example',
    email: 'test@test.com',
    password: 'password',
    address: {
      street: '214 Barton Springs Rd',
      street2: '',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
  }

  prismaMock.user.update.mockResolvedValue(user)

  await expect(Users.update({
    name: 'Example',
    address: {
      street: '214 Barton Springs Rd',
      street2: '',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    },
  }, 'test@test.com')).resolves.toMatchObject(
    expect.objectContaining({
      name: 'Example',
      email: 'test@test.com',
      password: 'password',
      address: {
        street: '214 Barton Springs Rd',
        street2: '',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
      },
    })
  )
})

test('Should get all orders for a user', async () => {
  const books = [
    {
      id: '65085f739542369c3328307d',
      title: 'Call of the Wild',
      isbn: '9788838439018',
      price: 1899,
      author: 'Jack London',
      orderIDs: [],
    },
    {
      id: '65085f739542369c3328307e',
      title: 'Moby Dick',
      isbn: '9780763630188',
      price: 2700,
      author: 'Herman Melville',
      orderIDs: [],
    },
  ]
  const order = {
    id: (new ObjectId()).toString(),
    userEmail: 'test@test.com',
    bookIDs: books.map(book => book.id),
    books,
    total: 4599,
    createdAt: new Date(),
  }

  prismaMock.order.findMany.mockResolvedValue([order])

  await expect(Users.getUserOrders('test@test.com')).resolves.toContain(
    expect.arrayContaining(
      [
        expect.objectContaining({
          userEmail: 'test@test.com',
          bookIDs: expect.arrayContaining(expect.stringMatching(/\d/)),
        })
      ]
    )
  )
})
