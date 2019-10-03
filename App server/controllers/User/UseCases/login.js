const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const constants = require('../../../constants');
const getPateint = require('./getPatient');

const login = async ({ email, password }) => {
  const rules = {
    email: 'required|email',
    password: 'required',
  };

  const fieldsValidated = await Validator.validateAsync({ email, password }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on doctor login', fieldsValidated);
  }

  const patient = await getPateint({ email });
  const hash = crypto
    .pbkdf2Sync(password, constants.PASSWORD_ENCRYPTION, 1000, 64, `sha512`)
    .toString(`hex`);
  if (patient.password !== hash) {
    throw new IzzyLogicError('Invalid credentials');
  }
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ patientId: patient._id, type: 'patient' }, process.env.KEY_APP, {
    expiresIn: '48h',
  });

  delete patient.password;

  return { token, patient };
};

module.exports = login;
