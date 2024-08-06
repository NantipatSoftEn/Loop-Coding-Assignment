import moment from 'moment'
import { getCurrentDayFake } from './addCurrentFake'
type Status = 'Open' | 'Closed'

const daysMap: { [key: string]: number } = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
}

const getDayIndex = (day: string): number => daysMap[day]

const isWithinRange = (
  currentDayIndex: number,
  startDayIndex: number,
  endDayIndex: number
): boolean => {
  if (startDayIndex <= endDayIndex) {
    return currentDayIndex >= startDayIndex && currentDayIndex <= endDayIndex
  } else {
    return currentDayIndex >= startDayIndex || currentDayIndex <= endDayIndex
  }
}

export const isOpenOnDay = async (openDays: string, isDevMode: boolean,fixDate:string): Promise<boolean> => {
  if (openDays === 'Open everyday') {
    console.log("Open everyday")
    return true
  }

  const [startDay, endDay] = openDays.replace('Open ', '').split(' - ')
  const startDayIndex = getDayIndex(startDay)
  const endDayIndex = getDayIndex(endDay)
  
  const currentDayIndex = getDayIndex(
    !isDevMode ? moment().format('dddd') : fixDate
  )

  return isWithinRange(currentDayIndex, startDayIndex, endDayIndex)
}
