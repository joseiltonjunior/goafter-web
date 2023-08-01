import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

export function Hooks({ children }: PropsWithChildren) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}
