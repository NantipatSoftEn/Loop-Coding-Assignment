import { i as isOpenOnDay } from './daysOpen_rezp4kJi.mjs';
import { i as isRestaurantTimeOpen } from './time_B3QHorHI.mjs';

const getRestaurantStatus = async (openDays, restaurantOpenTime, restaurantCloseTime, fixDate, fixTime, isDevMode = false) => {
  if (await isOpenOnDay(openDays, isDevMode, fixDate) && await isRestaurantTimeOpen(restaurantOpenTime, restaurantCloseTime, fixTime, isDevMode)) {
    return "Open";
  }
  return "Closed";
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getRestaurantStatus
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, getRestaurantStatus as g };
