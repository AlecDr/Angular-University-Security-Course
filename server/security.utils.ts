import * as crypto from 'crypto';
const util = require('util');

export const randomBytes = util.promisify(crypto.randomBytes);
