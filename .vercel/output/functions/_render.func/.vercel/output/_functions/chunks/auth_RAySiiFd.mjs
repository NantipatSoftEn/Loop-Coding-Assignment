import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { d as db } from './db_B47EA56_.mjs';

const adapter = new BetterSqlite3Adapter(db, {
  user: "user",
  session: "session"
});
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username
    };
  }
});

export { lucia as l };
