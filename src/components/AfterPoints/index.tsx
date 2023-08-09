import starIcon from '@/assets/star.svg'
import { AfterProps } from '@/types/after'
import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'

interface AfterPointsProps {
  afters: AfterProps[]
  setSelectedPoint: React.Dispatch<React.SetStateAction<AfterProps | undefined>>
}

export function AfterPoints({ afters, setSelectedPoint }: AfterPointsProps) {
  const [selected, setSelected] = useState<number | null>()

  const [sliderRef] = useKeenSlider({
    loop: true,
  })

  return (
    <div className="base:overflow-y-scroll base:max-h-[calc(100vh-270px)] mt-4 base:pr-4 flex flex-col gap-4 base:custom-scroll-bar">
      {afters.map((after, index) => (
        <div key={index}>
          <div
            className={`rounded-2xl bg-gray-500 shadow-md grid grid-cols-[300px,auto] md:grid-cols-1  hover:bg-gray-500/80 overflow-hidden h-auto  ${
              selected === index && 'border-2 border-gray-200'
            }`}
          >
            <div ref={sliderRef} className="keen-slider">
              {after.picsUrl.map((picUrl, index) => (
                <img
                  key={index}
                  src={picUrl}
                  alt="pic after"
                  className="w-full object-cover h-60 keen-slider__slide"
                />
              ))}
            </div>

            <div className="p-4 flex flex-col justify-between">
              <div>
                <p className="font-bold text-lg text-left">{after.name}</p>

                <div className="flex items-center">
                  <img src={starIcon} alt="star icon" />
                  <strong className="text-sm">{after.stars}</strong>
                  <span className="ml-1">{`(${after.indicator})`}</span>
                </div>
                <p className="text-sm text-left mt-4">{after.description}</p>
              </div>

              <div className="mt-4 md:hidden">
                {selected === index ? (
                  <>
                    <button
                      onClick={() => {
                        setSelected(null)
                        setSelectedPoint(undefined)
                      }}
                      className="bg-red-500 text-gray-200 font-bold w-full rounded-md py-2"
                    >
                      Menos informação
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSelected(index)
                        setSelectedPoint(after)
                      }}
                      className="bg-gray-200 text-gray-500 font-bold w-full rounded-md py-2"
                    >
                      Mais informações
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
