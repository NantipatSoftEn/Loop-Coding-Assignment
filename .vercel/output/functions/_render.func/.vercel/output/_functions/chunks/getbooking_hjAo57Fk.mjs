import { d as db } from './db_B47EA56_.mjs';

function getBookings() {
  const stmt = db.prepare("SELECT * FROM bookings");
  return stmt.all();
}
async function fetchBookings(username) {
  try {
    const bookings = getBookings();
    const filteredBookings = bookings.filter((booking) => booking.username === username);
    console.log("Filtered Bookings:", filteredBookings);
    return filteredBookings;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  fetchBookings
}, Symbol.toStringTag, { value: 'Module' }));

export { _page as _, fetchBookings as f };
