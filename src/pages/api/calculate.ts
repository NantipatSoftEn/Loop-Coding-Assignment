import { isOpenOnDay } from './daysOpen'
import { isRestaurantTimeOpen } from './time'

export const getRestaurantStatus = async (
  openDays: string,
  restaurantOpenTime: string,
  restaurantCloseTime: string,
  fixDate:string,
  fixTime:string,
  isDevMode = false,
): Promise<string> => {
  if (
    await isOpenOnDay(openDays, isDevMode,fixDate) &&
    await isRestaurantTimeOpen(restaurantOpenTime, restaurantCloseTime, fixTime,isDevMode)
  ) {
    return 'Open'
  }
  return 'Closed'
}
