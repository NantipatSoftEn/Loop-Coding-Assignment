import { db, type DataBooking } from "@/lib/db"


function getBookings() {
    const stmt = db.prepare('SELECT * FROM bookings')
    return stmt.all() as DataBooking[];
  }
  
  export async function fetchBookings():Promise<DataBooking[]> {
    try {
      const bookings: DataBooking[] = getBookings()
      console.log('Bookings:', bookings)
      return bookings
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      return []
    }
  }
  