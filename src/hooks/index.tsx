import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'
import { Analytics } from '@vercel/analytics/react'
import 'leaflet/dist/leaflet.css'
import 'keen-slider/keen-slider.min.css'

export function Hooks({ children }: PropsWithChildren) {
  return (
    <>
      <ToastContainer />
      <Analytics />
      {children}
    </>
  )
}
