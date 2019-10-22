import { USERS } from './database-data';
import { db } from './database';
import { DbUser } from './db-user';
import { Request, Response } from 'express';

export function createUser(req: Request, res: Response) {
  const { email, password }: { email: string; password: string } = req.body;

  const user: DbUser = db.createUser(email, password);

  console.log(USERS);

  res.status(200).json({
    id: user.id,
    email: user.email
  });
}
