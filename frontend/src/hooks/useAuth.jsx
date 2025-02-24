import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setCheckingStatus(false)
  }, [user])

  return { loggedIn, checkingStatus }
}

export default useAuth
