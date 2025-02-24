import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link, useNavigate } from 'react-router'
import { useUser } from '../context/UserContext'
import Header from '../components/Header'

const SignInPage = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  })
  const { password, email } = formData
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const { login } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('/api/auth/login', formData)
      console.log(data)
      if (!data.success) {
        return toast.error(data.message)
      }
      setFormData({
        email: '',
        password: '',
      })
      toast.success(data.message)
      setLoading(false)
      console.log('What are you doing')
      login(data?.user)
      navigate('/dashboard')
    } catch (error) {
      // console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }
  return (
    <>
      <Header />
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white p-6 md:p-8 rounded-lg w-full max-w-md shadow-lg'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <div className='text-center'>
              <h2 className='text-2xl md:text-3xl font-bold'>Log In</h2>
              <p className='text-slate-500 text-sm md:text-md mt-1'>
                Welcome Back! Please enter your detail
              </p>
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
              {loading ? 'Logging...' : 'Log In'}
            </button>
          </form>
          <p className='text-center  text-sm mt-4'>
            Don't have an account{' '}
            <Link
              to='/register'
              className='font-medium underline cursor-pointer hover:text-slate-700 '
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignInPage
