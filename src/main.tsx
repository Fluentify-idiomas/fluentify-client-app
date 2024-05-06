import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from './pages/Auth/LoginPage/index.tsx'
import { RegisterPage } from './pages/Auth/RegisterPage/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  }, {
    path: '/login',
    element: <LoginPage />
  }, {
    path: '/register',
    element: <RegisterPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
