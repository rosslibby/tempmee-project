export interface User {
  id: string
  password: string
  email: string
  name?: string
  orders?: Order[]
  address?: Address
}

export type Address = {
  street: string
  street2?: string
  city: string
  state: string
  zip: string
}

export interface Order {
  id?: string
  user: User
  userId: string
  books: Book[]
  bookIDs: string[]
  total: number
  createdAt: Date
}

export interface Book {
  id: string
  title: string
  isbn: string
  price: number
  author: string
  orders: Order[]
  orderIDs: string[]
}