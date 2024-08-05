import { isOpenOnDay } from './daysOpen'
import { isRestaurantTimeOpen } from './time'

export const getRestaurantStatus = (
  openDays: string,
  restaurantOpenTime: string,
  restaurantCloseTime: string,
  isDevMode = false
): string => {
  if (
    isOpenOnDay(openDays, isDevMode) &&
    isRestaurantTimeOpen(restaurantOpenTime, restaurantCloseTime, isDevMode)
  ) {
    return 'Open'
  }
  return 'Closed'
}
