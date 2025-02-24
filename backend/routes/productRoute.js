import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'
import productMiddleware from '../middleware/productMiddleware.js'

const productRouter = Router()

productRouter.post('/', productMiddleware, createProduct).get('/', getProducts)

productRouter
  .route('/:id')
  .put(productMiddleware, updateProduct)
  .delete(productMiddleware, deleteProduct)

export default productRouter
