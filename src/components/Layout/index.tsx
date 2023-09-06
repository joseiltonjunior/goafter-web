import { PropsWithChildren } from 'react'
import { Container, Content } from './styles'

import { Header } from '../Header'

interface LayoutProps extends PropsWithChildren {
  hideHeader?: boolean
}

export function Layout({ children, hideHeader }: LayoutProps) {
  return (
    <Container>
      {!hideHeader && <Header />}
      <Content>{children}</Content>
    </Container>
  )
}
