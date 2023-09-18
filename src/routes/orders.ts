import { create, orderById, userOrders } from '@controllers/orders'
import express, { Router } from 'express'

const router: Router = express.Router()

router.post('/', create)
router.get('/', userOrders)
router.get('/:id', orderById)

export default router
