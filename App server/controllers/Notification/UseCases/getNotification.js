const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicErrors = require('../../../common/IzzyLogicError');
const notificationSchema = require('../../../models/Notification');

const getNotification = async ({ patientId, doctorId, type, seen = false }) => {
  const rules = {
    type: 'required',
  };
  const query = {};
  if (type === 'user') {
    rules.patientId = 'required';
    query.userId = patientId;
  } else if (type === 'doctor') {
    rules.doctorId = 'required';
    query.doctorId = doctorId;
  } else {
    throw new IzzyLogicErrors('Invalid type');
  }
  const fieldsValidated = await Validator.validateAsync({ type, patientId, doctorId }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }
  query.seen = seen;
  const notificationResponse = await notificationSchema.find(query);
  return notificationResponse;
};
module.exports = getNotification;
