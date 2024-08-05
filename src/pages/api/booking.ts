import { lucia } from '../../lib/auth'
import { verify } from '@node-rs/argon2'
import { db, type DataBooking } from '../../lib/db'

import type { APIContext } from 'astro'

const saveBooking = (formData: DataBooking) => {
  const { guests, date, time, username } = formData
  const stmt = db.prepare(
    'INSERT INTO bookings (guests, date, time, username) VALUES (?, ?, ?, ?)'
  )
  stmt.run(guests, date, time, username)
}

export async function saveFormData(formData: DataBooking) {
  try {
    saveBooking(formData)
    console.log('Booking saved successfully!')
  } catch (error) {
    console.error('Failed to save booking:', error)
  }
}

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  console.log('formData', formData)

  return new Response()
}
