import { USERS } from './database-data';
import { db } from './database';
import { DbUser } from './db-user';
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';

export function createUser(req: Request, res: Response) {
  const { email, password }: { email: string; password: string } = req.body;

  if (email.length && password.length > 6) {
    /**
     * Using Argon2
     */
    // argon2.hash(password).then(passwordDigest => {
    //   const user: DbUser = db.createUser(email, passwordDigest);

    //   console.log(USERS);

    //   res.status(200).json({
    //     id: user.id,
    //     email: user.email
    //   });
    // });

    const user = db.createUser(
      email,
      crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')
    );

    console.log(USERS);

    return res.status(200).json({
      id: user.id,
      email: user.email
    });
  } else {
    return res.status(400).json({
      message:
        'You should provide an valid email and a password with at least 6 characters'
    });
  }
}
