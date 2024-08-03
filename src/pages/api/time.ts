import moment from "moment";

const convertTo24HourFormat = (time: string): string => {
  return moment(time, ["h:mm A"]).format("HH:mm");
};

export const isRestaurantTimeOpen = (
  restaurantOpenTime: string,
  restaurantCloseTime: string
): boolean => {
  const formattedRestaurantOpenTime = convertTo24HourFormat(restaurantOpenTime);
  const formattedRestaurantCloseTime = convertTo24HourFormat(restaurantCloseTime);
  const currentTime = moment().format("HH:mm");
  return (
    formattedRestaurantOpenTime >= currentTime &&
    currentTime <= formattedRestaurantCloseTime
  );
};
