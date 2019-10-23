import { SESSIONS } from './database-data';
import { Request, Response } from 'express';
import { clearSession } from './clear-session';
export function logout(req: Request, res: Response) {
  const sessionId = req.cookies.SESSIONID;

  clearSession(sessionId);

  res.clearCookie('SESSIONID');
  return res.status(200).json(null);
}
