import { useKeenSlider } from 'keen-slider/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

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
    <div
      ref={sliderRef}
      className="keen-slider relative flex items-center justify-between rounded-t-xl"
    >
      <button
        className="w-8 h-8 rounded-full bg-gray-950 absolute z-50 left-2 flex items-center justify-center hover:bg-gray-500"
        onClick={() => instanceRef.current?.prev()}
      >
        <FiChevronLeft />
      </button>
      {pics.map((picUrl, index) => (
        <img
          key={index}
          src={picUrl}
          alt="pic after"
          className="w-screen object-cover h-60 keen-slider__slide"
        />
      ))}
      <button
        className="w-8 h-8 rounded-full bg-gray-950 absolute z-50 right-2 flex items-center justify-center hover:bg-gray-500"
        onClick={() => instanceRef.current?.next()}
      >
        <FiChevronRight />
      </button>
    </div>
  )
}
