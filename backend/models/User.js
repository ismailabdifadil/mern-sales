import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      min: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'sales', 'customer'],
      default: 'customer',
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified(this.password)) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
