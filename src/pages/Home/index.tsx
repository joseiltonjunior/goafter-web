import { AfterPoints } from '@/components/AfterPoints'
import { Input } from '@/components/Input'
import { Map } from '@/components/Map'
import { useToast } from '@/hooks/useToast'
import { firestore } from '@/services/firebase'
import { AfterProps } from '@/types/after'

import { formatPhone } from '@/utils/formatPhone'

import { collection, getDocs, query } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

export function Home() {
  const [afters, setAfters] = useState<AfterProps[]>([])
  const [selectedPoint, setSelectedPoint] = useState<AfterProps>()
  const [aftersFiltered, setAftersFiltered] = useState<AfterProps[]>([])

  const { showToast } = useToast()

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
    handleFetchAfters()
  }, [handleFetchAfters])

  return (
    <div className="p-8 max-w-[1400px] ml-auto mr-auto grid grid-cols-[auto,550px] md:grid-cols-1  md:px-4 base:gap-16">
      <div>
        <div className="max-w-md">
          <Input
            onChange={(e) => {
              handleFilterPoints(e.target.value)
            }}
          />
        </div>

        <div className="mt-8 md:mb-4">
          <p>{aftersFiltered.length} Items</p>
          <h1 className="font-bold text-2xl">Onde é o After?</h1>

          <AfterPoints
            afters={aftersFiltered}
            setSelectedPoint={setSelectedPoint}
          />
        </div>
      </div>
      {afters.length > 0 && (
        <div
          data-selected={!!selectedPoint}
          className="rounded-2xl overflow-hidden grid grid-rows-1 gap-4 data-[selected=true]:grid-rows-2 md:hidden"
        >
          <Map
            afters={afters}
            selectLocation={selectedPoint}
            setSelectedPoint={setSelectedPoint}
          />

          {selectedPoint && (
            <div className="bg-gray-500 h-fit rounded-2xl overflow-hidden p-4">
              <>
                <p className="font-bold">Horários: </p>
                {selectedPoint.schedules.map((schedule) => (
                  <div key={schedule.name} className="flex justify-between">
                    <p className="text-sm text-left">{schedule.name}</p>
                    <p>{schedule.value}</p>
                  </div>
                ))}

                <div className="flex gap-2 mt-4 justify-between">
                  <p className="font-bold">Telefone:</p>
                  <p>{formatPhone(selectedPoint.phone)}</p>
                </div>
              </>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
