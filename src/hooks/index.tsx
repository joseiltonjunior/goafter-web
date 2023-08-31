import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'
import { SkeletonTheme } from 'react-loading-skeleton'
import { ModalProvider } from './useModal'
import { Analytics } from '@vercel/analytics/react'

import 'leaflet/dist/leaflet.css'
import 'keen-slider/keen-slider.min.css'
import 'react-loading-skeleton/dist/skeleton.css'

export function Hooks({ children }: PropsWithChildren) {
  return (
    <ModalProvider>
      <ToastContainer />
      <Analytics />
      <SkeletonTheme baseColor={'#2E2E35'} highlightColor={'#202022'}>
        {children}
      </SkeletonTheme>
    </ModalProvider>
  )
}
