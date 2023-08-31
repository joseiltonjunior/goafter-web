import theme from '@/styles/theme'
import styled, { css } from 'styled-components'
import ReactLoading from 'react-loading'

interface variantProps {
  variant: 'green' | 'dark' | 'blue' | 'outline' | 'red'
}

const colorVariants = {
  green: theme.colors.yellow[500],
  dark: theme.colors.gray[950],
  blue: theme.colors.blue[500],
  outline: 'transparent',
  red: theme.colors.red[500],
}

export const Container = styled.button<variantProps>`
  width: 100%;
  border-radius: 6px;
  padding: 8px;
  height: 42px;
  background-color: ${(props) => colorVariants[props.variant]};

  font-size: 16px;
  font-weight: bold;

  ${(props) =>
    props.variant === 'outline' &&
    css`
      border: 1px solid ${theme.colors.gray[300]};
    `}
`

export const Loading = styled(ReactLoading).attrs({
  width: 25,
  height: 25,
})`
  margin: 0 auto;
`
