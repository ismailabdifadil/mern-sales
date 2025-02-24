import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link, useNavigate } from 'react-router'
import Header from '../components/Header'

const RegisterPage = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const login = false
  const { name, email, password } = formData

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('/api/auth/register', formData)
      if (!data.success) {
        toast.error(data.message)
        return
      }
      setFormData({
        name: '',
        email: '',
        password: '',
      })
      toast.success(data.message)
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }
  return (
    <>
      <Header />
      <div className='min-h-screen flex items-center justify-center '>
        <div className='bg-white p-6 md:p-8 rounded-lg w-full max-w-md shadow-lg'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <div className='text-center'>
              <h2 className='text-2xl md:text-3xl font-bold'>
                Create an Account
              </h2>
              <p className='text-slate-500 text-sm md:text-md mt-1'>
                Welcome Back! Please enter your detail
              </p>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className='font-medium'>
                Name
              </label>
              <input
                className='input'
                value={name}
                id='name'
                type='text'
                placeholder='Enter your name'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className='font-medium'>
                Email
              </label>
              <input
                value={email}
                className='input'
                id='email'
                type='email'
                placeholder='Enter your name'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='' className='font-medium'>
                Password
              </label>
              <div className='relative'>
                <input
                  className='input relative'
                  value={password}
                  type={`${isPasswordShow ? 'text' : 'password'}`}
                  id='password'
                  placeholder='Enter your name'
                  onChange={handleChange}
                  required
                />
                {isPasswordShow ? (
                  <IoMdEye
                    className='absolute top-3 right-5 text-slate-800 text-xl cursor-pointer'
                    onClick={() => setIsPasswordShow(false)}
                  />
                ) : (
                  <IoMdEyeOff
                    className='absolute top-3 right-5 text-slate-800 text-xl cursor-pointer'
                    onClick={() => setIsPasswordShow(true)}
                  />
                )}
              </div>
            </div>

            <button
              type='submit'
              className='bg-slate-900 hover:bg-slate-800 text-white cursor-pointer rounded-md py-3 mt-2 transition'
            >
              {loading ? 'Loading...' : 'Create Account'}
            </button>
          </form>
          <p className='text-center  text-sm mt-4'>
            Already have an account{' '}
            <Link
              to='/login'
              className='font-medium underline cursor-pointer hover:text-slate-700 '
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
