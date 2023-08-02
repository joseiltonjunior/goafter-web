/* eslint-disable @typescript-eslint/no-explicit-any */
import { CoordsProps, PointsProps } from '@/types/points'
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
import marker from '@/assets/marker.svg'
import L from 'leaflet'

interface MapProps extends ComponentProps<'div'> {
  points: PointsProps[]
  userLocation: CoordsProps | null
  selectLocation?: CoordsProps
  setSelectedPoint: React.Dispatch<
    React.SetStateAction<CoordsProps | undefined>
  >
}

const markerIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

export function Map({
  points,
  userLocation,
  selectLocation,
  setSelectedPoint,
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

        map.flyTo([lat, lng], 11)

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
      focusMarker(selectLocation.latitude, selectLocation.longitude)
      const index = points.findIndex(
        (point) =>
          point.properties.latitude === selectLocation.latitude &&
          point.properties.longitude === selectLocation.longitude,
      )
      setSelectedMarkerIndex(index !== -1 ? index : null)
    }
  }, [focusMarker, points, selectLocation])

  return (
    <MapContainer
      ref={mapRef}
      center={
        userLocation
          ? [userLocation.latitude, userLocation.longitude]
          : [-8.0358926, -34.9443898]
      }
      zoom={4}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}?access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`}
      />
      {points.map((point, index) => (
        <Marker
          ref={(ref) => (markerRefs[index] = ref)}
          position={[point.properties.latitude, point.properties.longitude]}
          key={index}
          icon={markerIcon}
          eventHandlers={{
            click: () => {
              setSelectedPoint({
                latitude: point.properties.latitude,
                longitude: point.properties.longitude,
              })
              setSelectedMarkerIndex(index)
              focusMarker(point.properties.latitude, point.properties.longitude)
            },
          }}
        >
          <Popup>
            <p className="font-bold text-base">
              {point.properties.name} - {point.properties.adm1name}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
