import moment from 'moment'

const convertTo24HourFormat = (time: string): string => {
  return moment(time, ['h:mm A']).format('HH:mm')
}

export const isRestaurantTimeOpen = (
  restaurantOpenTime: string,
  restaurantCloseTime: string,
  isDevMode: boolean
): boolean => {
  const formattedRestaurantOpenTime = convertTo24HourFormat(restaurantOpenTime)
  const formattedRestaurantCloseTime =
    convertTo24HourFormat(restaurantCloseTime)
  const currentTime = !isDevMode ? moment().format('HH:mm') : '17:00'
  return (
    formattedRestaurantOpenTime >= currentTime &&
    currentTime <= formattedRestaurantCloseTime
  )
}
