import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import { Hooks } from './hooks/index.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Hooks>
      <RouterProvider router={router} />
    </Hooks>
  </React.StrictMode>,
)
