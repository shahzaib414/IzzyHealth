const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const DoctorModel = require('../models/DoctorsModel');

const jwtVerify = promisify(jwt.verify);

const validPaths = [
  '/Users/login',
  '/Doctors/login',
  // '/Doctors/create',
  '/Users/sign-up',
  '/Doctors/forgot-password',
  '/Users/forgot-password',
  '/Users/verify-email',
  '/Events/webhook',
];

const canAccessWithoutToken = (req) => {
  const valid = req.method === 'OPTIONS' || validPaths.includes(req.path);

  return valid;
};

const jwtAuth = async (req, res, next) => {
  if (canAccessWithoutToken(req)) {
    return next();
  }

  let token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.error('TOKEN_NOT_PROVIDED', 401, req.path);
  }

  token = token.split(' ');

  const decoded = await jwtVerify(
    token.length > 1 ? token[1] : token[0],
    process.env.KEY_APP,
  ).catch((err) => {
    console.log(err.message); // eslint-disable-line
    return res.error('TOKEN_NOT_PROVIDED', 401, req.path);
  });

  if (decoded.type === 'patient') {
    const patient = await UserModel.findById(decoded.patientId);

    if (patient && patient.toJSON().isVerified) {
      req.patientId = decoded.patientId;
      req.userType = 'patient';

      return next();
    }

    return res.error('User is not verified', 403, req.path);
  }

  if (decoded.type === 'doctor') {
    const doctor = await DoctorModel.findById(decoded.doctorId);

    if (doctor) {
      req.doctorId = decoded.doctorId;
      req.userType = 'doctor';

      return next();
    }

    return res.error('Doctor does not exist', 403, req.path);
  }

  return undefined;
};

module.exports = jwtAuth;
