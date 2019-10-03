const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const jwtVerify = promisify(jwt.verify);

module.exports = async (token, { request, response } = {}) => {
  try {
    const decoded = await jwtVerify(token, process.env.KEY_APP);

    return decoded;
  } catch (error) {
    if (response) {
      return response.error('TOKEN_NOT_PROVIDED', 401, request.path);
    }

    return false;
  }
};
