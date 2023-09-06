import { useKeenSlider } from 'keen-slider/react'
import { useModal } from '../../hooks/useModal'
import { Button } from '../Button'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// import { FiX } from 'react-icons/fi'

export function Modal() {
  const {
    closeModal,
    modalState: { visible, afterData },
  } = useModal()

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 2,
    },
    loop: true,
  })

  if (!visible) {
    return null
  }

  return (
    <div
      onClick={() => closeModal()}
      className={`bg-gray-950/80 h-screen w-screen fixed z-[9999]  ${
        visible ? 'visible' : 'hidden'
      } items-center flex justify-center px-4`}
    >
      <div
        className="bg-gray-500  w-full  rounded-xl  flex flex-col justify-between relative"
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
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
          {afterData?.picsUrl.map((picUrl, index) => (
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

        <div className="p-4">
          <div className="flex justify-between">
            <p>{afterData?.name}</p>
            <div className="flex gap-1">
              <p>{afterData?.stars}</p>
              <p>({afterData?.indicator})</p>
            </div>
          </div>

          <p>{afterData?.description}</p>
          <div className="mt-2">
            <p>Tipo: {afterData?.type}</p>
            <p>Telefone: {afterData?.phone}</p>
            <p>Endereço: {afterData?.locale}</p>
          </div>

          <p className="mt-4">Horários</p>
          {afterData?.schedules.map((item, index) => (
            <div key={index} className="flex justify-between">
              <p>{item.name}</p>
              <p>{item.value}</p>
            </div>
          ))}

          <Button
            className="mt-2"
            variant="dark"
            onClick={() => {
              closeModal()
            }}
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}
