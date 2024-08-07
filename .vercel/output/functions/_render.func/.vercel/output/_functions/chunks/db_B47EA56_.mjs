import sqlite from 'better-sqlite3';
import { hash } from '@node-rs/argon2';

const db = sqlite(":memory:");
db.exec(`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
)`);
db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
)`);
db.exec(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guests INTEGER,
      date TEXT,
      time TEXT,
      username TEXT,
      restaurant TEXT,
      status INTEGER
    )
  `);
db.exec(`CREATE TABLE IF NOT EXISTS fake_time (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  time TEXT NOT NULL
  )
`);
var Status = /* @__PURE__ */ ((Status2) => {
  Status2[Status2["Reserve"] = 0] = "Reserve";
  Status2[Status2["CheckIn"] = 1] = "CheckIn";
  Status2[Status2["CheckOut"] = 2] = "CheckOut";
  return Status2;
})(Status || {});
function addUser(id, username, passwordHash2) {
  const stmt = db.prepare(`INSERT INTO user (id, username, password_hash) VALUES (?, ?, ?)`);
  stmt.run(id, username, passwordHash2);
  console.log("User added successfully");
}
const userId = "1";
const userName = "admin12345";
const passwordHash = await hash("admin12345", {
  // recommended minimum parameters
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1
});
addUser(userId, userName, passwordHash);
const ADMIN = "admin12345";

export { ADMIN as A, Status as S, db as d };
