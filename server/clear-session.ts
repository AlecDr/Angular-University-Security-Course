import { SESSIONS } from './database-data';
export function clearSession(sessionId: string) {
  SESSIONS[sessionId] = null;
}
