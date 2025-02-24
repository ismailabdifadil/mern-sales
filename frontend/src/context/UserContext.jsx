import { set } from 'mongoose'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const userFromLocal = JSON.parse(localStorage.getItem('user'))
  const [user, setUser] = useState(userFromLocal || null)

  const login = (data) => {
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }
  function logout() {
    localStorage.removeItem('user')
    setUserData(null)
  }
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}

export default UserContextProvider
