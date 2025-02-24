import React from 'react'
import SignInPage from './pages/SignInPage'
import Header from './components/Header'
import Hero from './components/Hero'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Products from './pages/ProductsPage'
import Receipts from './pages/Receipts'
import Customers from './pages/Customers'
import Vendors from './pages/Vendors'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='/dashboard/products' element={<Products />} />
            <Route path='/dashboard/receipts' element={<Receipts />} />
            <Route path='/dashboard/customers' element={<Customers />} />
            <Route path='/dashboard/vendors' element={<Vendors />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
