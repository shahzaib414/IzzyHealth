const bcrypt = require('bcryptjs');

module.exports = {
  encrypt: (value) => bcrypt.hashSync(value, 10),
  compare: (value, encrypted) => bcrypt.compareSync(value, encrypted),
};
