const isOpenOnDay = (day: string, openDays: string): boolean => {
  if (openDays === "Open everyday") {
    return true;
  }

  const daysMap: { [key: string]: number } = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  const [startDay, endDay] = openDays.replace("Open ", "").split(" - ");
  const startDayIndex = daysMap[startDay];
  const endDayIndex = daysMap[endDay];
  const currentDayIndex = daysMap[day];

  if (startDayIndex <= endDayIndex) {
    return currentDayIndex >= startDayIndex && currentDayIndex <= endDayIndex;
  } else {
    // Handle wrap-around case (e.g., "Friday - Monday")
    return currentDayIndex >= startDayIndex || currentDayIndex <= endDayIndex;
  }
};

// Example usage:
const openDays1 = "Open everyday";
const openDays2 = "Open Monday - Friday";

console.log(isOpenOnDay("Wednesday", openDays1)); // true
console.log(isOpenOnDay("Saturday", openDays1)); // true
console.log(isOpenOnDay("Wednesday", openDays2)); // true
console.log(isOpenOnDay("Saturday", openDays2)); // false
