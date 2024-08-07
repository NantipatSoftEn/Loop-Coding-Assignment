import { d as db, S as Status } from '../../chunks/db_B47EA56_.mjs';
export { renderers } from '../../renderers.mjs';

const saveBooking = (formData) => {
  const { guests, date, time, username, id, restaurant } = formData;
  const stmt = db.prepare(
    "INSERT INTO bookings (guests, date, time, username, id ,restaurant, status) VALUES (?, ?, ?, ?,?, ?, ?)"
  );
  stmt.run(guests, date, time, username, id, restaurant, Status.Reserve);
};
async function saveFormData(formData) {
  try {
    saveBooking(formData);
    console.log("Booking saved successfully!");
  } catch (error) {
    console.error("Failed to save booking:", error);
  }
}
function getBookings() {
  const stmt = db.prepare("SELECT * FROM bookings");
  return stmt.all();
}
async function fetchBookings() {
  try {
    const bookings = getBookings();
    console.log("Bookings:", bookings);
    return bookings;
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}
async function POST(context) {
  const formData = await context.request.formData();
  console.log("formData", formData);
  const dataBooking = {
    guests: formData.get("guests"),
    date: formData.get("date"),
    time: formData.get("time"),
    username: formData.get("username"),
    id: formData.get("id"),
    restaurant: formData.get("restaurant")
  };
  console.log("formData", dataBooking);
  saveBooking(dataBooking);
  return new Response();
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  fetchBookings,
  saveFormData
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
