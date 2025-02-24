import { Link, useNavigate } from 'react-router'
import { useUser } from '../context/UserContext'

const Header = ({ dashboard }) => {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  return (
    <header className='h-24  py-6 w-full shadow  px-4 bg-white'>
      <nav className='flex items-center justify-between max-w-5xl m-auto '>
        <div className='flex items-center '>
          <Link to='/'>
            <span className='font-semibold text-lg md:text-3xl hidden md:block'>
              Sales System
            </span>
          </Link>
        </div>
        {dashboard && (
          <ul className='flex gap-4 font-semibold '>
            <Link to={'/dashboard/products'}>Products</Link>
            <Link to={'/dashboard/customers'}>Customers</Link>
            <Link to={'/dashboard/receipts'}>Receipts</Link>
            <Link to={'/dashboard/vendors'}>Vendors</Link>
          </ul>
        )}
        {user?.name ? (
          <div className='flex space-x-3 items-center'>
            <p>
              Hi,👍{' '}
              <span className='font-bold text-lg text-slate-800'>
                {user?.name.at(0).toUpperCase() + user?.name.slice(1)}
              </span>
            </p>
            <Link
              to='/dashboard'
              className='border px-6 py-2 rounded-lg  hover:bg-slate-900 hover:text-white transition cursor-pointer'
            >
              Dashboard
            </Link>
            <Link
              type='submit'
              className='border px-6 py-2 rounded-lg bg-orange-700  hover:border-orange-700 hover:bg-transparent hover:text-orange-700 text-white transition cursor-pointer'
              onClick={() => logout()}
            >
              Logout
            </Link>
          </div>
        ) : (
          <Link
            to='/login'
            className='border px-6 py-2 rounded-lg  hover:bg-slate-900 hover:text-white transition cursor-pointer'
          >
            Log In
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
