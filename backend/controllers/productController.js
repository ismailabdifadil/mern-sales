import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body
  if (!name || !description || !price) {
    res.status(400)
    throw new Error('Please fill all the fields')
  }

  const product = new Product({ name, description, price, user: req.user._id })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.description = description
    product.price = price
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.deleteOne()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
