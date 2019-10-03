/* eslint-disable camelcase */
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const hasher = require('../../../common/hasher');
const DoctorModel = require('../../../models/DoctorsModel');

const createDoctor = async ({ email, password, password_confirmation, category, subCategory }) => {
  const rules = {
    email: 'required|email',
    password: 'required|confirmed', // this rule require a password_confirmation field from client
    category: 'required',
    subCategory: 'required',
  };

  const fieldsValidated = await Validator.validateAsync(
    { email, password, password_confirmation, category, subCategory },
    { rules },
  );

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on doctor login', fieldsValidated);
  }

  const existDoctor = await DoctorModel.findOne({ email });

  if (existDoctor) {
    throw new IzzyLogicError('There is a doctor with this email');
  }

  const hash = hasher.encrypt(password);

  const doctor = (await DoctorModel.create({
    email,
    password: hash,
    category,
    subCategory,
  })).toJSON();

  // Not reveal information
  delete doctor.password;

  return doctor;
};

module.exports = createDoctor;
