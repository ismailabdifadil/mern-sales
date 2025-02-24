import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'Cancelled'],
    default: 'pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default Order
