import { ComponentProps } from 'react'

import { Container, Loading } from './styles'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'green' | 'dark' | 'blue' | 'outline' | 'red'
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'blue',
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <Container variant={variant} {...rest}>
      {isLoading ? <Loading type="bars" /> : children}
    </Container>
  )
}
