import { db } from "@/lib/db"


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
  