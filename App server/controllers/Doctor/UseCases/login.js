const jwt = require('jsonwebtoken');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const hasher = require('../../../common/hasher');
const getDoctor = require('./getDoctor');

const login = async ({ email, password }) => {
  const rules = {
    email: 'required|email',
    password: 'required',
  };

  const fieldsValidated = await Validator.validateAsync({ email, password }, { rules });

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on doctor login', fieldsValidated);
  }

  const doctor = await getDoctor({ email });

  const areEqual = hasher.compare(password, doctor.password);

  if (!areEqual) {
    throw new IzzyLogicError('Invalid credentials');
  }

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ doctorId: doctor._id, type: 'doctor' }, process.env.KEY_APP, {
    expiresIn: '48h',
  });

  // Not reveal information
  delete doctor.password;

  return { token, doctor };
};

module.exports = login;
