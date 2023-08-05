import { AfterPoints } from '@/components/AfterPoints'
import { Input } from '@/components/Input'
import { Map } from '@/components/Map'
import { useToast } from '@/hooks/useToast'
import { firestore } from '@/services/firebase'
import { AfterProps } from '@/types/after'
import { CoordsProps } from '@/types/points'

import { collection, getDocs, query } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

export function Home() {
  const [afters, setAfters] = useState<AfterProps[]>([])
  const [selectedPoint, setSelectedPoint] = useState<CoordsProps>()
  const [aftersFiltered, setAftersFiltered] = useState<AfterProps[]>([])
  const [userLocation, setUserLocation] = useState<CoordsProps | null>(null)

  const { showToast } = useToast()

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

  const handleFetchAfters = useCallback(() => {
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
            }) as AfterProps,
        )

        setAfters(aftersResponse)
        setAftersFiltered(aftersResponse)
      })
      .catch(() => {
        showToast('Error while fetching sales', {
          type: 'error',
          theme: 'colored',
        })
      })
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

  useEffect(() => {
    handleGetUserLocation()
    handleFetchAfters()
  }, [handleGetUserLocation, handleFetchAfters])

  return (
    <div className="p-8 max-w-[1400px] ml-auto mr-auto h-[calc(100%-64px)] grid grid-cols-[auto,500px] md:grid-cols-1 md:px-4 base:gap-16">
      <div className="shadow-xl right-8 rounded-2xl overflow-hidden md:h-96 mb-12 md:w-full z-50 base:hidden">
        <Map
          afters={afters}
          selectLocation={selectedPoint}
          userLocation={userLocation}
          setSelectedPoint={setSelectedPoint}
        />
      </div>

      <div className="z-10">
        <Input
          onChange={(e) => {
            handleFilterPoints(e.target.value)
          }}
        />

        <div className="mt-8 p-2">
          <p>{aftersFiltered.length} Items</p>
          <h1 className="font-bold text-2xl">Onde é o After?</h1>

          <AfterPoints
            afters={aftersFiltered}
            setSelectedPoint={setSelectedPoint}
          />
        </div>
      </div>
      <div className="shadow-xl right-8 rounded-2xl overflow-hidden md:h-56 md:w-full z-50 md:hidden">
        <Map
          afters={afters}
          selectLocation={selectedPoint}
          userLocation={userLocation}
          setSelectedPoint={setSelectedPoint}
        />
      </div>
    </div>
  )
}
