import L from 'leaflet'

export function markerIcon(icon: string) {
  return new L.Icon({
    iconUrl: icon,
    iconSize: [45, 45],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'custom-marker-icon',
  })
}

export function userMarkerIcon(icon: string) {
  return new L.Icon({
    iconUrl: icon,
    iconSize: [60, 60],
    // iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}
