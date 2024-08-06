import moment from 'moment'
import { getCurrentTimeFake } from './addCurrentFake'

export const convertTo24HourFormat = (time: string): string => {
  return moment(time, ['h:mm A']).format('HH:mm')
}

export const isRestaurantTimeOpen = async (
  restaurantOpenTime: string,
  restaurantCloseTime: string,
  fixTime:string,
  isDevMode: boolean
): Promise<boolean> => {
  const openTime = convertTo24HourFormat(restaurantOpenTime)
  const closeTime = convertTo24HourFormat(restaurantCloseTime)

  const currentTime = !isDevMode ? moment().format('HH:mm') : fixTime
  console.log(`currentTime ${currentTime} open${openTime} close${closeTime}`)
  return currentTime >= openTime && currentTime <= closeTime
}
