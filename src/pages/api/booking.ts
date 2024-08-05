import { lucia } from '../../lib/auth'
import { verify } from '@node-rs/argon2'
import { db, Status, type DataBooking } from '../../lib/db'

import type { APIContext } from 'astro'

const saveBooking = (formData: DataBooking) => {
  const { guests, date, time, username, id, restaurant } = formData
  const stmt = db.prepare(
    'INSERT INTO bookings (guests, date, time, username, id ,restaurant, status) VALUES (?, ?, ?, ?,?, ?, ?)'
  )
  stmt.run(guests, date, time, username, id, restaurant, Status.Reserve)
}

export async function saveFormData(formData: DataBooking) {
  try {
    saveBooking(formData)
    console.log('Booking saved successfully!')
  } catch (error) {
    console.error('Failed to save booking:', error)
  }
}

function getBookings() {
  const stmt = db.prepare('SELECT * FROM bookings')
  return stmt.all()
}

export async function fetchBookings() {
  try {
    const bookings = getBookings()
    console.log('Bookings:', bookings)
    return bookings
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    return []
  }
}

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  console.log('formData', formData)
  const dataBooking: DataBooking = {
    guests: formData.get('guests') as unknown as number,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    username: formData.get('username') as string,
    id: formData.get('id') as string,
    restaurant: formData.get('restaurant') as string,
  }
  
  console.log('formData', dataBooking)
  saveBooking(dataBooking)
  const booking: Array<DataBooking> = (await fetchBookings()) as DataBooking[]
  console.log('booking', booking)
  return new Response()
}
