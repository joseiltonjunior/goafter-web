/* eslint-disable @typescript-eslint/no-explicit-any */
import 'leaflet/dist/leaflet.css'
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import L from 'leaflet'
import { AfterProps } from '@/types/after'
import { CoordsProps } from '@/types/points'

interface MapProps extends ComponentProps<'div'> {
  afters: AfterProps[]
  userLocation?: CoordsProps | null
  selectLocation?: AfterProps
  setSelectedPoint: React.Dispatch<React.SetStateAction<AfterProps | undefined>>
}

export function Map({ afters, selectLocation, setSelectedPoint }: MapProps) {
  const mapRef = useRef<any>(null)

  const markerRefs = useMemo(() => {
    return {} as { [key: string]: any }
  }, [])

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(
    null,
  )

  function markerIcon(icon: string) {
    return new L.Icon({
      iconUrl: icon,
      iconSize: [45, 45],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className: 'custom-marker-icon',
    })
  }

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
    }
  }, [focusMarker, afters, selectLocation])

  return (
    <MapContainer
      ref={mapRef}
      center={[-8.063169, -34.871139]}
      zoom={12}
      className="rounded-2xl overflow-hidden max-h-[417px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}?access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`}
      />
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
            <p className="font-bold text-base">{after.name}</p>
            <p className="">{after.locale}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
