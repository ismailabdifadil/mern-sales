import { Router } from 'express'
import { getUsers, updateUserRole } from '../controllers/userController.js'

const userRouter = Router()
userRouter.get('/', getUsers)
userRouter.put('/:id/role', updateUserRole)

export default userRouter
