import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { JWT_SECRET } from '../config/env.js'

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name) {
    res.status(400)
    throw new Error('Name is required')
  }
  if (!email) {
    res.status(400)
    throw new Error('Email is required')
  }
  if (!password) {
    res.status(400)
    throw new Error('Password is required')
  }

  const user = await User.findOne({ email })
  if (user) {
    res.status(400)
    throw new Error('User already exists')
  }

  //   Hashing the password before storing to the DB
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  })

  await newUser.save()

  newUser.password = undefined

  res.cookie('token', genToken(newUser._id), {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.status(201).send({
    success: true,
    message: 'User created Successfully',
    data: newUser,
    token: genToken(newUser._id),
  })
})
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email) {
    res.status(400)
    throw new Error('Email is required')
  }
  if (!password) {
    res.status(400)
    throw new Error('Password is required')
  }
  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('User does not exists')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    res.status(400)
    throw new Error('Password do not match')
  }
  user.password = undefined
  const token = genToken(user._id)

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.status(200).send({
    success: true,
    message: 'User logged in successfully',
    user,
    token,
  })
})

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  if (!role) {
    res.status(400)
    throw new Error('Role is required')
  }

  const user = await User.findById(id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  user.role = role
  await user.save()

  res.status(200).send({
    success: true,
    message: 'User role updated successfully',
    user,
  })
})

function genToken(id) {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '7d',
  })
}
