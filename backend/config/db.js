import mongoose from 'mongoose'
import { MONGODB_URI } from './env.js'

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.log('Please provide the MONGODB_URI, chen .env file')
    return
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI)
      console.log(`Database Connected`.cyan.bold)
    }
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
