const Validator = require('../../common/validator');
const DoctorModel = require('../../models/DoctorsModel');
const UserModel = require('../../models/UserModel');
const IzzyLogicError = require('../../common/IzzyLogicError');
const IzzyFieldErrors = require('../../common/IzzyFieldErrors');
const hasher = require('../../common/hasher');

const USER_TYPE = 'user';
const DOCTOR_TYPE = 'doctor';

const changePassword = async (
  // eslint-disable-next-line camelcase
  { id, oldPassword, newPassword, newPassword_confirmation },
  { type },
) => {
  if (![USER_TYPE, DOCTOR_TYPE].includes(type)) {
    throw new IzzyLogicError(`type must be ${USER_TYPE} or ${DOCTOR_TYPE}`);
  }

  const rules = {
    id: 'required',
    oldPassword: 'required',
    newPassword: 'required|confirmed', // this rule require a password_confirmation field from client
  };

  const fieldsValidated = await Validator.validateAsync(
    { newPassword, newPassword_confirmation, oldPassword, id },
    { rules },
  );

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on changit password', fieldsValidated);
  }

  let EntityModel;

  if (type === DOCTOR_TYPE) {
    EntityModel = DoctorModel;
  }
  if (type === USER_TYPE) {
    EntityModel = UserModel;
  }

  const patientOrDoctor = await EntityModel.findById(id);

  if (!patientOrDoctor) {
    throw new IzzyLogicError(`${type} not found`);
  }

  const areEqual = hasher.compare(oldPassword, patientOrDoctor.password);

  if (!areEqual) {
    throw new IzzyLogicError('Invalid credentials');
  }

  const hash = hasher.encrypt(newPassword);

  patientOrDoctor.password = hash;
  patientOrDoctor.save();

  return { id, message: 'Password has changed sucessfully' };
};

module.exports = changePassword;
