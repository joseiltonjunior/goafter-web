import { AfterProps } from '@/types/after'
import React, { createContext, useContext, useState } from 'react'

interface ModalInfoProps {
  afterData: AfterProps | null
}

interface ModalStateProps extends ModalInfoProps {
  visible: boolean
}

interface ModalContextData {
  modalState: ModalStateProps
  openModal({ afterData }: ModalInfoProps): void
  closeModal(): void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

export function ModalProvider({ children }: React.PropsWithChildren) {
  const [modalState, setModalState] = useState<ModalStateProps>({
    visible: false,
    afterData: null,
  })

  const openModal = (payload: ModalStateProps) => {
    document.body.style.overflow = 'hidden'
    setModalState({ ...payload, visible: true })
  }

  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setModalState({ visible: false, afterData: null })
  }

  return (
    <ModalContext.Provider
      value={{
        modalState,
        closeModal,
        openModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal(): ModalContextData {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider')
  }

  return context
}
