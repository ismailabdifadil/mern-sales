import express from 'express'
import { PORT } from './config/env.js'
import connectDB from './config/db.js'
import colors from 'colors'
import authRouter from './routes/authRoute.js'
import productRouter from './routes/productRoute.js'
import orderRouter from './routes/orderRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()

app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Full stack Sales System',
  })
})

app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/users', userRouter)

app.listen(PORT, async () => {
  console.log(`The server is started on Port ${PORT}`)
  await connectDB()
})
