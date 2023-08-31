import starIcon from '@/assets/star.svg'
import { AfterProps } from '@/types/after'

import { CarouselPics } from './CarouselPics'
// import { useModal } from '@/hooks/useModal'
import { afterPointsStyles } from './styles'
import { useNavigate } from 'react-router-dom'

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
  // const { openModal } = useModal()

  const navigate = useNavigate()

  return (
    <div className={afterPointsStyles.container}>
      {afters.map((after, index) => (
        <div key={index} className={afterPointsStyles.card}>
          <CarouselPics pics={after.picsUrl} />

          <div className={afterPointsStyles.cardInfo}>
            <div>
              <p className={afterPointsStyles.title}>{after.name}</p>

              <div className={afterPointsStyles.viewFlex}>
                <img src={starIcon} alt="star icon" />
                <strong className={afterPointsStyles.textSmall}>
                  {after.stars}
                </strong>
                <span
                  className={afterPointsStyles.indicator}
                >{`(${after.indicator})`}</span>
              </div>
              <p className={afterPointsStyles.description}>
                {after.description}
              </p>
            </div>

            <div className={afterPointsStyles.viewButtons}>
              <button
                onClick={() => {
                  navigate(`/details?id=${after.id}`)
                }}
                className={afterPointsStyles.buttonMore}
              >
                Mais detalhes
              </button>
              {selectLocation?.name === after.name ? (
                <button
                  onClick={() => {
                    setSelectedPoint(undefined)
                  }}
                  className={afterPointsStyles.buttonHide}
                >
                  Mostrar menos
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedPoint(after)
                  }}
                  className={afterPointsStyles.buttonView}
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
