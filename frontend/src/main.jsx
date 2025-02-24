import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import UserContextProvider from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>
)
