import { Router } from 'express'
import orderMiddleware from '../middleware/orderMiddleware.js'
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from '../controllers/orderController.js'

const orderRouter = Router()

orderRouter
  .route('/')
  .post(orderMiddleware, createOrder)
  .get(orderMiddleware, getOrders)

orderRouter
  .route('/:id')
  .put(orderMiddleware, updateOrder)
  .delete(orderMiddleware, deleteOrder)

export default orderRouter
