export const formatDistance = (distance: number) => {
  const roundedDistance = Math.round(distance * 10) / 10
  return `${roundedDistance} km`
}
