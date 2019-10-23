import { SESSIONS } from './database-data';
import { Request, Response } from 'express';

export function getUser(req: Request, res: Response) {
  const sessionId = req.cookies.SESSIONID;
  const session = SESSIONS[sessionId];

  console.log(session);
  console.log(sessionId);

  if (session) {
    if (session.isValid()) {
      const { email, id } = session.user;

      return res.status(200).json({ email, id });
    } else {
      return res.status(401).json(null);
    }
  } else {
    return res.status(401).json(null);
  }
}
