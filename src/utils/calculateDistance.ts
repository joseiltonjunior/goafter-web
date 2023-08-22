interface calculateDistanceProps {
  actualCoords: {
    latitude: number
    longitude: number
  }
  afterCoords: {
    latitude: number
    longitude: number
  }
}

export const calculateDistance = ({
  actualCoords,
  afterCoords,
}: calculateDistanceProps) => {
  const earthRadius = 6371 // Raio médio da Terra em quilômetros
  const { latitude: lat1, longitude: lon1 } = actualCoords
  const { latitude: lat2, longitude: lon2 } = afterCoords

  const toRadians = (value: number) => {
    return (value * Math.PI) / 180
  }

  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = earthRadius * c

  return distance
}
