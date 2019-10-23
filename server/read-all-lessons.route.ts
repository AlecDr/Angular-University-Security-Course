import { SESSIONS } from './database-data';
import { Request, Response } from 'express';
import { db } from './database';

export function readAllLessons(req: Request, res: Response) {
  const sessionId = req.cookies.SESSIONID;
  const session = SESSIONS[sessionId];
  let result = { lessons: [] };
  let status = 401;

  if (session) {
    if (session.isValid()) {
      status = 200;
      result = { lessons: db.readAllLessons() };
    }
  }

  return res.status(status).json(result);
}
