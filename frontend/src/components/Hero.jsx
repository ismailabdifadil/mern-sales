import React from 'react'
import { Link } from 'react-router'
import { useUser } from '../context/UserContext'
import Header from './Header'

const Hero = () => {
  const { user, logout } = useUser()
  return (
    <>
      <Header />
      <div className='  flex items-center justify-center w-full h-[550px]'>
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl max-w-3xl text-center font-bold lg:text-6xl '>
            Welcome to Sales System at Jahmuriya Technology Solutions (Jtech)
          </h1>
          <div className='mt-12 flex gap-4'>
            {user ? (
              <Link
                type='submit'
                className='border px-6 py-2 rounded-lg bg-slate-900  hover:bg-slate-700 text-white transition cursor-pointer'
                onClick={() => logout()}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to={'/register'}
                  type='submit'
                  className='border px-6 py-2 rounded-lg bg-slate-900  hover:bg-slate-700 text-white transition cursor-pointer'
                >
                  Register
                </Link>
                <Link
                  to={'/login'}
                  type='submit'
                  className='border px-6 py-2 rounded-lg  hover:bg-slate-900 hover:text-white transition cursor-pointer'
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
