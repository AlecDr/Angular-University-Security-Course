import { User } from './../src/app/model/user';
import { Moment } from 'moment';
import moment = require('moment');

export class Session {
  private validUntil: Moment;
  private static readonly VALIDITY_MINUTES = 2;

  constructor(public sessionId: string, public user: User) {
    this.validUntil = moment().add(Session.VALIDITY_MINUTES, 'minutes');
  }

  isValid(): boolean {
    return moment().diff(this.validUntil, 'minutes') <= 0;
  }
}
