export interface AfterProps {
  locale: string
  name: string
  stars: number
  id?: string
  logoUrl: string
  picsUrl: string[]
  phone: string
  description: string
  indicator: number
  type: string
  recommendation: boolean
  schedules: [
    {
      name: string
      value: string
    },
  ]
  coords: {
    latitude: number
    longitude: number
  }
}
