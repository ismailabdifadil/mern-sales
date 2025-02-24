const errorMiddleware = (err, req, res, next) => {
  let statusCode = res.statusCode || 500

  if (err.name === 'ValidationError') {
    statusCode = 400
    const errors = Object.values(err.errors).map((val) => val.message)
    return res.status(statusCode).json({ errors })
  }
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    return res.status(statusCode).json({ message: 'Invalid token' })
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    return res.status(statusCode).json({ message: 'Token expired' })
  }
  res.status(statusCode).send({
    message: err.message,
    stack: err.stack,
  })
}

export default errorMiddleware
