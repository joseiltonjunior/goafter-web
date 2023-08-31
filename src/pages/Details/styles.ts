import { css, styled } from 'styled-components'

interface buttonCarouselProps {
  orientation: 'prev' | 'next'
}

export const Container = styled.div`
  display: flex;
  padding: 2rem;
  gap: 2rem;
`

export const Aside = styled.div`
  height: fit-content;

  img {
    width: 250px;
    border-radius: 16px;
    overflow: hidden;
  }
`

export const Content = styled.div`
  flex-direction: column;
`

export const Carousel = styled.div`
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  align-items: center;
  height: 500px;

  img {
    object-fit: cover;
  }
`

export const ButtonCarousel = styled.button<buttonCarouselProps>`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #202022;
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 100;

  ${(props) =>
    props.orientation === 'prev' &&
    css`
      left: 10px;
    `}

  ${(props) =>
    props.orientation === 'next' &&
    css`
      right: 10px;
    `}
`
