import { SESSIONS } from './database-data';
import { User } from './../src/app/model/user';
import { Session } from './session';
export function createSession(sessionId: string, user: User): Session {
  const session = new Session(sessionId, user);
  SESSIONS[`${sessionId}`] = session;

  return session;
}
