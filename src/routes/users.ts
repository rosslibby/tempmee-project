import { getUser, login, register, update, userOrders } from '@controllers/users'
import express, { Router } from 'express'

const router: Router = express.Router()

router.post('/', register)
router.put('/', update)
router.get('/:email', getUser)
router.post('/login', login)
router.get('/orders', userOrders)

export default router
