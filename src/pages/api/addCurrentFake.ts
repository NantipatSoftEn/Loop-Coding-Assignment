import { db, type FakeTime } from '@/lib/db'
import type { APIContext } from 'astro'

const saveFakeTime = (formData: FakeTime) => {
  const { date, time } = formData
  const stmt = db.prepare('INSERT INTO fake_time (date,time) VALUES (?, ?)')
  stmt.run(date, time)
  console.log('saveFakeTime')
}

function getFakeTime() {
  const stmt = db.prepare('SELECT * FROM fake_time')
  return stmt.all() as FakeTime[]
}

export async function fetchFakeTime() {
  try {
    const fakeTimes = getFakeTime()
    console.log('FakeTime:', fakeTimes)
    return fakeTimes
  } catch (error) {
    console.error('Failed to fetch fake_time:', error)
    return []
  }
}

export const getCurrentDayFake = async () => {
  const data: Array<FakeTime> = await fetchFakeTime()
  const currentDay = data[data.length - 1]?.date
  return currentDay
}

export const getCurrentTimeFake = async () => {
  const data: Array<FakeTime> = await fetchFakeTime()
  const currentDay = data[data.length - 1]?.time
  return currentDay
}

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  console.log('formData', formData)
  const dataFake: FakeTime = {
    date: formData.get('fix_date') as string,
    time: formData.get('fix_time') as string,
  }
  saveFakeTime(dataFake)
  return new Response()
}
