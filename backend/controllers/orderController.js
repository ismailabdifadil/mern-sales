import mongoose from 'mongoose'
import Order from '../models/Order.js'

// Create a new order
export const createOrder = async (req, res) => {
  const { productId } = req.body
  const customerId = req.user._id
  const newOrder = new Order({
    customer: new mongoose.Types.ObjectId(customerId),
    product: new mongoose.Types.ObjectId(productId),
    status: 'pending',
    orderDate: Date.now(),
  })
  try {
    await newOrder.save()
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('product')
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update an order by ID
export const updateOrder = async (req, res) => {
  const { productId } = req.body
  const customerId = req.user._id
  const updatingOrder = new Order({
    customer: new mongoose.Types.ObjectId(customerId),
    product: new mongoose.Types.ObjectId(productId),
    status: req.body.status || 'pending',
    orderDate: Date.now(),
  })
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, updatingOrder, {
      new: true,
      runValidators: true,
    })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json({ message: 'Order deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
