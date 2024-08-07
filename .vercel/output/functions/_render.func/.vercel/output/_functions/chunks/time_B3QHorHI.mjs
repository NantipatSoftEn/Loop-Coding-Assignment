import moment from 'moment';
import './db_B47EA56_.mjs';

const convertTo24HourFormat = (time) => {
  return moment(time, ["h:mm A"]).format("HH:mm");
};
const isRestaurantTimeOpen = async (restaurantOpenTime, restaurantCloseTime, fixTime, isDevMode) => {
  const openTime = convertTo24HourFormat(restaurantOpenTime);
  const closeTime = convertTo24HourFormat(restaurantCloseTime);
  const currentTime = !isDevMode ? moment().format("HH:mm") : fixTime;
  console.log(`currentTime ${currentTime} open${openTime} close${closeTime}`);
  return currentTime >= openTime && currentTime <= closeTime;
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  convertTo24HourFormat,
  isRestaurantTimeOpen
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, convertTo24HourFormat as c, isRestaurantTimeOpen as i };
