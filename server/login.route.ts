import { randomBytes } from './security.utils';
import { DbUser } from './db-user';
import { USERS } from './database-data';
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { createSession } from './create-session';

export async function login(req: Request, res: Response) {
  let { email, password } = req.body;
  password = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  let user: DbUser = null;

  for (const id in USERS) {
    if (USERS.hasOwnProperty(id)) {
      const dbUser = USERS[id];
      if (dbUser.email === email) {
        user = dbUser;
      }
    }
  }

  if (user) {
    if (user.passwordDigest === password) {
      let sessionId = await randomBytes(32);
      sessionId = sessionId.toString('hex');
      const session = createSession(sessionId, user);

      res.cookie('SESSIONID', session.sessionId, { httpOnly: true });
      return res.status(200).json({ id: user.id, email: user.email });
    } else {
      return res.status(401).json(null);
    }
  } else {
    return res.status(401).json(null);
  }
}
