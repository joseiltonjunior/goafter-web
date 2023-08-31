import App from '@/App'
import { Details } from '@/pages/Details'
import { Error } from '@/pages/Error'
import { Home } from '@/pages/Home'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/details',
        element: <Details />,
      },
    ],
  },
])
