import sqlite from 'better-sqlite3'
import { hash } from '@node-rs/argon2'
export const db = sqlite(':memory:')

db.exec(`CREATE TABLE IF NOT EXISTS user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
)`)




db.exec(`CREATE TABLE IF NOT EXISTS session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
)`)

db.exec(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guests INTEGER,
      date TEXT,
      time TEXT,
      username TEXT,
      restaurant TEXT,
      status INTEGER
    )
  `)

db.exec(`CREATE TABLE IF NOT EXISTS fake_time (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  time TEXT NOT NULL
  )
`)

export interface DatabaseUser {
  id: string
  username: string
  password_hash: string
}

export enum Status {
  Reserve,
  CheckIn,
  CheckOut,
}


function addUser(id: string, username: string, passwordHash: string) {
  const stmt = db.prepare(`INSERT INTO user (id, username, password_hash) VALUES (?, ?, ?)`);
  stmt.run(id, username, passwordHash);
  console.log('User added successfully');
}

// Example usage
const userId = '1';
const userName = 'admin12345';
const passwordHash = await hash("admin12345", {
  // recommended minimum parameters
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
})

addUser(userId, userName, passwordHash);
export const ADMIN = "admin12345"

export interface DataBooking {
  id: string
  guests: number
  date: string
  time: string
  username: string
  restaurant: string
  status?: Status
}

export interface FakeTime{
  date: string
  time: string
}
