import moment from 'moment'

export const convertTo24HourFormat = (time: string): string => {
  return moment(time, ['h:mm A']).format('HH:mm')
}

export const isRestaurantTimeOpen = (
  restaurantOpenTime: string,
  restaurantCloseTime: string,
  isDevMode: boolean
): boolean => {
  const openTime = convertTo24HourFormat(restaurantOpenTime)
  const closeTime = convertTo24HourFormat(restaurantCloseTime)
  const currentTime = !isDevMode ? moment().format('HH:mm') : '17:00'
  console.log(`currentTime ${currentTime} open${openTime} close${closeTime}`)
  return currentTime >= openTime && currentTime <= closeTime
}
