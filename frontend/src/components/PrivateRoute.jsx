import { Navigate, Outlet } from 'react-router'
import useAuth from '../hooks/useAuth'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuth()
  if (checkingStatus) {
    return <p>Loading...</p>
  }
  return loggedIn ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute
