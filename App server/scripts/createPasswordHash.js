const crypto = require('crypto');
const constants = require('../constants');

const password = 'testpassword';
console.log(
  crypto.pbkdf2Sync(password, constants.PASSWORD_ENCRYPTION, 1000, 64, `sha512`).toString(`hex`),
);
