import { SESSIONS } from './database-data';
import { Request, Response } from 'express';
import { clearSession } from './clear-session';

export function getUser(req: Request, res: Response) {
  const sessionId = req.cookies.SESSIONID;
  const session = SESSIONS[sessionId];

  if (session) {
    if (session.isValid()) {
      const { email, id } = session.user;

      return res.status(200).json({ email, id });
    } else {
      return res.status(401).json(null);
      clearSession(sessionId);
    }
  } else {
    clearSession(sessionId);
    return res.status(401).json(null);
  }
}
