import moment from "moment";

type Status = "Open" | "Closed";

const daysMap: { [key: string]: number } = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

const getDayIndex = (day: string): number => daysMap[day];

const isWithinRange = (
  currentDayIndex: number,
  startDayIndex: number,
  endDayIndex: number
): boolean => {
  if (startDayIndex <= endDayIndex) {
    return currentDayIndex >= startDayIndex && currentDayIndex <= endDayIndex;
  } else {
    return currentDayIndex >= startDayIndex || currentDayIndex <= endDayIndex;
  }
};

export const isOpenOnDay = (openDays: string,isDevMode:boolean): boolean => {
  if (openDays === "Open everyday") {
    return true;
  }

  const [startDay, endDay] = openDays.replace("Open ", "").split(" - ");
  const startDayIndex = getDayIndex(startDay);
  const endDayIndex = getDayIndex(endDay);
  const currentDayIndex = getDayIndex(!isDevMode ? moment().format("dddd"): "Sunday");

  return isWithinRange(currentDayIndex, startDayIndex, endDayIndex);
};
