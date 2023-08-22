import starIcon from '@/assets/star.svg'
import { AfterProps } from '@/types/after'

import { CarouselPics } from './CarouselPics'

interface AfterPointsProps {
  afters: AfterProps[]
  setSelectedPoint: React.Dispatch<React.SetStateAction<AfterProps | undefined>>
  selectLocation?: AfterProps
}

export function AfterPoints({
  afters,
  setSelectedPoint,
  selectLocation,
}: AfterPointsProps) {
  return (
    <div className="base:overflow-y-scroll base:max-h-[calc(100vh-270px)] mt-4 flex flex-col gap-4 base:custom-scroll-bar pr-2 md:pr-0">
      {afters.map((after, index) => (
        <div key={index} className="bg-gray-500 h-fit rounded-2xl">
          <CarouselPics pics={after.picsUrl} />

          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="font-bold text-lg text-left">{after.name}</p>

              <div className="flex items-center">
                <img src={starIcon} alt="star icon" />
                <strong className="text-sm">{after.stars}</strong>
                <span className="ml-1">{`(${after.indicator})`}</span>
              </div>
              <p className="text-sm text-left mt-4 truncate">
                {after.description}
              </p>
            </div>

            <div className="mt-4 md:hidden flex gap-2">
              <button
                disabled
                onClick={() => {
                  setSelectedPoint(after)
                }}
                className="bg-gray-400 text-gray-500 font-bold w-full rounded-md py-2"
              >
                Mais detalhes
              </button>
              {selectLocation?.name === after.name ? (
                <button
                  onClick={() => {
                    setSelectedPoint(undefined)
                  }}
                  className="bg-red-500 hover:bg-red-500/80 text-gray-200 font-bold w-full rounded-md py-2"
                >
                  Mostrar menos
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedPoint(after)
                  }}
                  className="bg-gray-200 hover:bg-gray-200/80 text-gray-500 font-bold w-full rounded-md py-2"
                >
                  Mostrar no mapa
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
