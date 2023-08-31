/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import { AfterProps } from '@/types/after'
import { CoordsProps } from '@/types/points'
import { markerIcon, userMarkerIcon } from '@/utils/markerCustomIcon'
import { calculateDistance } from '@/utils/calculateDistance'
import { formatDistance } from '@/utils/formatDistance'
import userMarker from '@/assets/user-point.png'

interface MapProps extends ComponentProps<'div'> {
  afters: AfterProps[]
  userLocation?: CoordsProps | null
  selectLocation?: AfterProps
  setSelectedPoint: React.Dispatch<React.SetStateAction<AfterProps | undefined>>
}

export function Map({
  afters,
  selectLocation,
  setSelectedPoint,
  userLocation,
}: MapProps) {
  const mapRef = useRef<any>(null)

  const markerRefs = useMemo(() => {
    return {} as { [key: string]: any }
  }, [])

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(
    null,
  )

  const focusMarker = useCallback(
    (lat: number, lng: number) => {
      if (mapRef.current) {
        const map = mapRef.current

        map.flyTo([lat, lng], 13)

        const marker = markerRefs[selectedMarkerIndex!]
        if (marker) {
          marker.openPopup()
        }
      }
    },
    [markerRefs, selectedMarkerIndex],
  )

  useEffect(() => {
    if (selectLocation) {
      focusMarker(
        selectLocation.coords.latitude,
        selectLocation.coords.longitude,
      )
      const index = afters.findIndex(
        (after) =>
          after.coords.latitude === selectLocation.coords.latitude &&
          after.coords.longitude === selectLocation.coords.longitude,
      )
      setSelectedMarkerIndex(index !== -1 ? index : null)
    } else {
      if (mapRef.current) {
        mapRef.current.flyTo([-8.063169, -34.871139], 11)

        const marker = markerRefs[selectedMarkerIndex!]

        if (marker) {
          marker.closePopup()
        }
      }
    }
  }, [focusMarker, afters, selectLocation, markerRefs, selectedMarkerIndex])

  return (
    <MapContainer
      ref={mapRef}
      center={
        userLocation
          ? [userLocation?.latitude, userLocation?.longitude]
          : [-8.063169, -34.871139]
      }
      zoom={11}
      className="rounded-2xl overflow-hidden max-h-[417px] base:max-h-[550px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}?access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`}
      />
      {userLocation && (
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={userMarkerIcon(userMarker)}
        >
          <Popup>
            <p className="font-bold text-base">Minha localização atual</p>
          </Popup>
        </Marker>
      )}
      {afters.map((after, index) => (
        <Marker
          ref={(ref) => (markerRefs[index] = ref)}
          position={[after.coords.latitude, after.coords.longitude]}
          key={index}
          icon={markerIcon(after.logoUrl)}
          eventHandlers={{
            click: () => {
              setSelectedPoint(after)
              setSelectedMarkerIndex(index)
              focusMarker(after.coords.latitude, after.coords.longitude)
            },
          }}
        >
          <Popup>
            <div className="flex items-center gap-2">
              <p className="font-bold text-base">{after.name}</p>
              {userLocation && (
                <p className="font-bold text-base">
                  {' - '}
                  {formatDistance(
                    calculateDistance({
                      actualCoords: userLocation,
                      afterCoords: after.coords,
                    }),
                  )}
                </p>
              )}
            </div>
            <span>{after.locale}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
