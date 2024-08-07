import { d as db } from '../../chunks/db_B47EA56_.mjs';
export { renderers } from '../../renderers.mjs';

const saveFakeTime = (formData) => {
  const { date, time } = formData;
  const stmt = db.prepare("INSERT INTO fake_time (date,time) VALUES (?, ?)");
  stmt.run(date, time);
  console.log("saveFakeTime");
};
function getFakeTime() {
  const stmt = db.prepare("SELECT * FROM fake_time");
  return stmt.all();
}
async function fetchFakeTime() {
  try {
    const fakeTimes = getFakeTime();
    console.log("FakeTime:", fakeTimes);
    return fakeTimes;
  } catch (error) {
    console.error("Failed to fetch fake_time:", error);
    return [];
  }
}
const getCurrentDayFake = async () => {
  const data = await fetchFakeTime();
  const currentDay = data[data.length - 1]?.date;
  return currentDay;
};
const getCurrentTimeFake = async () => {
  const data = await fetchFakeTime();
  const currentDay = data[data.length - 1]?.time;
  return currentDay;
};
async function POST(context) {
  const formData = await context.request.formData();
  console.log("formData", formData);
  const dataFake = {
    date: formData.get("fix_date"),
    time: formData.get("fix_time")
  };
  saveFakeTime(dataFake);
  return new Response();
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  fetchFakeTime,
  getCurrentDayFake,
  getCurrentTimeFake
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
