import { Input } from '@/components/Input'
import { Map } from '@/components/Map'
import { useToast } from '@/hooks/useToast'
import { CoordsProps, PointsProps } from '@/types/points'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import starIcon from '@/assets/star.svg'

export function Home() {
  const [points, setPoints] = useState<PointsProps[]>([])
  const [selectedPoint, setSelectedPoint] = useState<CoordsProps>()
  const [pointsFiltered, setPointsFiltered] = useState<PointsProps[]>([])
  const [userLocation, setUserLocation] = useState<CoordsProps | null>(null)

  const { showToast } = useToast()

  const fetchPoints = useCallback(async () => {
    await axios
      .get(
        'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson',
      )
      .then((response) => {
        const pointsBrazil = response.data.features.filter(
          (point: PointsProps) => point.properties.adm0name === 'Brazil',
        )

        setPoints(pointsBrazil)
        setPointsFiltered(pointsBrazil)
      })
      .catch(() => {
        showToast('Error ao buscar os dados', {
          type: 'error',
          theme: 'colored',
        })
      })
  }, [showToast])

  const handleGetUserLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ latitude, longitude })
      },
      () => {
        showToast('Erro ao obter a localização', {
          type: 'error',
          theme: 'colored',
        })
      },
    )
  }, [showToast])

  function handleFilterPoints(text: string) {
    if (text.length < 3) {
      setPointsFiltered(points)
      return
    }

    const fitler = points.filter((point) =>
      point.properties.adm1name.toUpperCase().includes(text.toUpperCase()),
    )

    if (fitler) {
      setPointsFiltered(fitler)
    }
  }

  useEffect(() => {
    handleGetUserLocation()
    fetchPoints()
  }, [fetchPoints, handleGetUserLocation])

  return (
    <div className="p-8 h-screen base:flex base:gap-16">
      <div className="w-80 md:w-full z-10">
        <Input
          onChange={(e) => {
            handleFilterPoints(e.target.value)
          }}
        />

        <div className="shadow-xl right-8 w-[calc(100%-420px)] h-auto rounded-2xl overflow-hidden md:h-72 md:w-full z-50 mt-8 base:hidden">
          <Map
            points={points}
            selectLocation={selectedPoint}
            userLocation={userLocation}
            setSelectedPoint={setSelectedPoint}
          />
        </div>

        <div className="mt-8 p-2">
          <p>{pointsFiltered.length} Items</p>
          <h1 className="font-bold text-4xl">Features</h1>
        </div>

        <div className="base:overflow-y-scroll base:max-h-[calc(100%-180px)] p-2 mt-4 flex flex-col gap-4">
          {pointsFiltered.map((point, index) => (
            <button
              onClick={() => {
                setSelectedPoint({
                  latitude: point.properties.latitude,
                  longitude: point.properties.longitude,
                })
              }}
              key={index}
              className="rounded-2xl p-4 bg-white shadow-md flex flex-col gap-2 w-full"
            >
              <p className="font-bold text-lg">
                {point.properties.name} - {point.properties.adm1name}
              </p>
              <div className="flex gap-5">
                <div className="flex">
                  <img src={starIcon} alt="star icon" />
                  <p className="text-sm">{point.properties.rank_max}</p>
                </div>
                <p className="text-sm">
                  {point.properties.adm0name} - {point.properties.iso_a2}
                </p>
              </div>

              <div className="text-sm items-start flex flex-col">
                <p>Coordenadas:</p>
                <p>Latitude: {point.properties.latitude}</p>
                <p>Longitute: {point.properties.longitude}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="shadow-xl right-8 w-[calc(100%-420px)] h-auto rounded-2xl overflow-hidden md:h-56 md:w-full z-50 md:hidden">
        <Map
          points={points}
          selectLocation={selectedPoint}
          userLocation={userLocation}
          setSelectedPoint={setSelectedPoint}
        />
      </div>
    </div>
  )
}
