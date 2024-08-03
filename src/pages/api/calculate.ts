import { isOpenOnDay } from "./daysOpen";
import { isRestaurantTimeOpen } from "./time";

export const getRestaurantStatus = (
  openDays: string,
  restaurantOpenTime: string,
  restaurantCloseTime: string
): string => {
  if (
    isOpenOnDay(openDays) &&
    isRestaurantTimeOpen(restaurantOpenTime, restaurantCloseTime)
  ) {
    return "Open";
  }
  return "Closed";
};
