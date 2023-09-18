import { allBooks, bookById, populateBooks } from '@controllers/books'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', allBooks)
router.get('/populate-books', populateBooks)
router.get('/:id', bookById)

export default router
