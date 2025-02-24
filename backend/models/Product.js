import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
  },
  { timestamps: true }
)

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
