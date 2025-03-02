import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const orderMiddleware = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'Not authorized, user not found' })
      }

      const { role } = req.user

      if (role === 'admin' || role === 'salesperson') {
        return next()
      } else if (role === 'customer') {
        if (req.method !== 'GET') {
          return res.status(403).json({ message: 'Customer can only read' })
        }
        return next()
      } else {
        return res.status(403).json({ message: 'Role not recognized' })
      }
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }
}

export default orderMiddleware
