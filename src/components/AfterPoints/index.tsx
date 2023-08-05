import { CoordsProps } from '@/types/points'

import starIcon from '@/assets/star.svg'
import { AfterProps } from '@/types/after'

interface AfterPointsProps {
  afters: AfterProps[]
  setSelectedPoint: React.Dispatch<
    React.SetStateAction<CoordsProps | undefined>
  >
}

export function AfterPoints({ afters, setSelectedPoint }: AfterPointsProps) {
  return (
    <div className="base:overflow-y-scroll base:max-h-[calc(100vh-290px)] p-2 mt-4 flex flex-col gap-4">
      {afters.map((after, index) => (
        <button
          onClick={() => {
            setSelectedPoint({
              latitude: after.coords.latitude,
              longitude: after.coords.longitude,
            })
          }}
          key={index}
        >
          <div className="rounded-2xl bg-gray-500 shadow-md grid grid-cols-[300px,auto] md:grid-cols-1 h-fit hover:bg-gray-500/80 overflow-hidden">
            <img
              src={after.picsUrl[0]}
              alt="pic after"
              className="w-full object-cover h-full"
            />
            <div className="p-4">
              <p className="font-bold text-lg text-left">
                {after.name} - {after.type}
              </p>

              <div className="flex">
                <img src={starIcon} alt="star icon" />
                <p className="text-sm">{after.stars}</p>
              </div>
              <p className="text-sm text-left mt-4">{after.description}</p>

              <p className="text-left text-sm mt-2">Endereço: {after.locale}</p>

              <p className="text-sm text-left mt-2">Telefone: {after.phone}</p>

              <p className="text-sm text-left mt-2">Horários: </p>
              {after.schedules.map((schedule) => (
                <div key={schedule.name} className="flex justify-between">
                  <p className="text-sm text-left">{schedule.name}</p>
                  <p>{schedule.value}</p>
                </div>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
