export interface CoordsProps {
  latitude: number
  longitude: number
}

export interface PointsProps {
  properties: {
    name: string
    adm0name: string
    adm1name: string
    iso_a2: string
    rank_max: number
    latitude: number
    longitude: number
  }
}
