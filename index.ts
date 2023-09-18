import express, { Express, Request, Response } from 'express'
import 'dotenv/config'
import users from '@routes/users'
import orders from '@routes/orders'
import books from '@routes/books'

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use('/users', users)
app.use('/orders', orders)
app.use('/books', books)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the book store.')
})

app.listen(port, () => console.log(`[server]: running on port ${port}`))
