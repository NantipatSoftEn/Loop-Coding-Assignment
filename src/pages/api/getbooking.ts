import { db, type DataBooking } from "@/lib/db"


function getBookings() {
    const stmt = db.prepare('SELECT * FROM bookings')
    return stmt.all() as DataBooking[];
  }
  
  export async function fetchBookings(username: string): Promise<DataBooking[]> {
    try {
      const bookings: DataBooking[] = getBookings();
      const filteredBookings = bookings.filter(booking => booking.username === username);
      console.log('Filtered Bookings:', filteredBookings);
      return filteredBookings;
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      return [];
    }
  }