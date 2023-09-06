import { css, styled } from 'styled-components'

interface buttonCarouselProps {
  orientation: 'prev' | 'next'
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const Aside = styled.div`
  height: fit-content;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 250px;
    border-radius: 16px;
    overflow: hidden;
  }
`

export const Content = styled.div`
  padding-bottom: 1rem;
`

export const Carousel = styled.div`
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  /* width: 500px; */
  align-items: center;
  height: 500px;
  /* position: relative; */

  @media (max-width: 900px) {
    height: 300px;
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
