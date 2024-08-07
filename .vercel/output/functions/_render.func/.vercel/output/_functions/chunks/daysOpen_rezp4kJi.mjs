import moment from 'moment';
import './db_B47EA56_.mjs';

const daysMap = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7
};
const getDayIndex = (day) => daysMap[day];
const isWithinRange = (currentDayIndex, startDayIndex, endDayIndex) => {
  if (startDayIndex <= endDayIndex) {
    return currentDayIndex >= startDayIndex && currentDayIndex <= endDayIndex;
  } else {
    return currentDayIndex >= startDayIndex || currentDayIndex <= endDayIndex;
  }
};
const isOpenOnDay = async (openDays, isDevMode, fixDate) => {
  if (openDays === "Open everyday") {
    console.log("Open everyday");
    return true;
  }
  const [startDay, endDay] = openDays.replace("Open ", "").split(" - ");
  const startDayIndex = getDayIndex(startDay);
  const endDayIndex = getDayIndex(endDay);
  const currentDayIndex = getDayIndex(
    !isDevMode ? moment().format("dddd") : fixDate
  );
  return isWithinRange(currentDayIndex, startDayIndex, endDayIndex);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  isOpenOnDay
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, isOpenOnDay as i };
