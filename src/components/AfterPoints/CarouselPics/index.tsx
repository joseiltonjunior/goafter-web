import { useKeenSlider } from 'keen-slider/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { carouselStyles } from './styles'

interface CarouselPicsProps {
  pics: string[]
}

export function CarouselPics({ pics }: CarouselPicsProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 2,
    },
    loop: true,
  })

  return (
    <div ref={sliderRef} className={carouselStyles.container}>
      <button
        className={carouselStyles.buttonPrev}
        onClick={() => instanceRef.current?.prev()}
      >
        <FiChevronLeft />
      </button>
      {pics.map((picUrl, index) => (
        <img
          key={index}
          src={picUrl}
          alt="pic after"
          className={carouselStyles.slide}
        />
      ))}
      <button
        className={carouselStyles.buttonNext}
        onClick={() => instanceRef.current?.next()}
      >
        <FiChevronRight />
      </button>
    </div>
  )
}
