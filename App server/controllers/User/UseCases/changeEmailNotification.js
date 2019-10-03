const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicErrors = require('../../../common/IzzyLogicError');
const getPatient = require('./getPatient');

const changeEmailNotification = async ({ id, email, notificationStatus }) => {
  const rules = {
    id: 'required',
    email: 'required|email',
    notificationStatus: 'required',
  };
  const fieldsValidated = await Validator.validateAsync(
    { id, email, notificationStatus },
    { rules },
  );
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on doctor login', fieldsValidated);
  }
  const patient = await getPatient({ id, email });
  if (!patient) {
    throw new IzzyLogicErrors('User Does not exist');
  }
  patient.emailNotification = notificationStatus;
  await patient.save();
  return patient.toJSON();
};

module.exports = changeEmailNotification;
