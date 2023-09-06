import { AfterPoints } from '@/components/AfterPoints'
import { Input } from '@/components/Input'
import { Map } from '@/components/Map'
import { useToast } from '@/hooks/useToast'
import { firestore } from '@/services/firebase'
import { AfterProps } from '@/types/after'
import { CoordsProps } from '@/types/points'

// import { formatPhone } from '@/utils/formatPhone'

import { collection, getDocs, query } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
// import { useNavigate } from 'react-router-dom'

export function Home() {
  const [afters, setAfters] = useState<AfterProps[]>([])
  const [selectedPoint, setSelectedPoint] = useState<AfterProps>()
  const [aftersFiltered, setAftersFiltered] = useState<AfterProps[]>([])
  const [userLocation, setUserLocation] = useState<CoordsProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { showToast } = useToast()

  const handleFetchAfters = useCallback(() => {
    setIsLoading(true)
    const q = query(collection(firestore, 'afters'))
    getDocs(q)
      .then((querySnapshot) => {
        const aftersResponse = querySnapshot.docs.map(
          (doc) =>
            ({
              logoUrl: doc.data().logoUrl,
              description: doc.data().description,
              picsUrl: doc.data().picsUrl,
              indicator: doc.data().indicator,
              locale: doc.data().locale,
              name: doc.data().name,
              phone: doc.data().phone,
              stars: doc.data().stars,
              coords: doc.data().coords,
              type: doc.data().type,
              recommendation: doc.data().recommendation,
              schedules: doc.data().schedules,
              id: doc.id,
            }) as AfterProps,
        )

        setAfters(aftersResponse)
        setAftersFiltered(aftersResponse)
      })
      .catch(() => {
        showToast('Error while fetching sales', {
          type: 'error',
          theme: 'light',
        })
      })
      .finally(() => setIsLoading(false))
  }, [showToast])

  function handleFilterPoints(text: string) {
    if (text.length > 3) {
      const filter = afters.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      )
      setAftersFiltered(filter)
      return
    }
    setAftersFiltered(afters)
  }

  const handleGetUserLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ latitude, longitude })
      },
      () => {
        showToast(
          'Não foi possível obter a localização atual. Algumas funcionalidades encontram-se desativadas.',
          {
            type: 'error',
            theme: 'light',
          },
        )
      },
    )
  }, [showToast])

  useEffect(() => {
    handleGetUserLocation()
    handleFetchAfters()
  }, [handleFetchAfters, handleGetUserLocation])

  return (
    <div className="p-8 ml-auto mr-auto grid grid-cols-[500px,auto] md:grid-cols-1  md:px-4 base:gap-16">
      <div>
        <div className="max-w-md">
          {isLoading ? (
            <Skeleton height={40} borderRadius={8} />
          ) : (
            <Input
              onChange={(e) => {
                handleFilterPoints(e.target.value)
              }}
            />
          )}
        </div>

        <div className="mt-8 md:mb-4">
          {isLoading ? (
            <>
              <Skeleton width={140} height={16} />
              <Skeleton width={180} height={24} />
              <Skeleton height={400} borderRadius={16} className="mt-8" />
              <Skeleton height={400} borderRadius={16} className="mt-4" />
            </>
          ) : (
            <>
              <p>{aftersFiltered.length} afters encontrados</p>
              <h1 className="font-bold text-2xl">Onde é o After?</h1>
              <AfterPoints
                afters={aftersFiltered}
                setSelectedPoint={setSelectedPoint}
                selectLocation={selectedPoint}
              />
            </>
          )}
        </div>
      </div>
      {isLoading ? (
        <Skeleton height={500} borderRadius={16} />
      ) : (
        <div
          data-selected={!!selectedPoint}
          className="rounded-2xl overflow-hidden grid grid-rows-1 gap-4 md:hidden"
        >
          <Map
            afters={afters}
            selectLocation={selectedPoint}
            setSelectedPoint={setSelectedPoint}
            userLocation={userLocation}
          />
        </div>
      )}
    </div>
  )
}
