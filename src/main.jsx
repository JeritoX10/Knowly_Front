import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routerApp } from './routerApp'
import './index.css'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={createBrowserRouter(routerApp)} />
  </StrictMode>
)
