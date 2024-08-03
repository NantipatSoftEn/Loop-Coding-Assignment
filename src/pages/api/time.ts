const currentTime = "18:00"; // 5:00 PM in 24-hour format
const convertTo24HourFormat = (time: string) => {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  return `${hours.padStart(2, "0")}:${minutes}`;
};

const restaurantOpenTime = convertTo24HourFormat("5:00 PM");
console.log("convertTo24HourFormat", restaurantOpenTime);

const isRestaurantOpenAfter = (
  restaurantOpenTime: string,
  currentTime: string
) => {
  return restaurantOpenTime > currentTime;
};

if (isRestaurantOpenAfter(restaurantOpenTime, currentTime)) {
  console.log(`The restaurant opens after ${restaurantOpenTime}`);
} else {
  console.log(`The restaurant does not open after ${currentTime}`);
}
