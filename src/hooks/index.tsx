import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'
import { Analytics } from '@vercel/analytics/react'

export function Hooks({ children }: PropsWithChildren) {
  return (
    <>
      <ToastContainer />
      <Analytics />
      {children}
    </>
  )
}
