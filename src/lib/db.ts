import sqlite from 'better-sqlite3'

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
