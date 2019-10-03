const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicErrors = require('../../../common/IzzyLogicError');
const notificationSchema = require('../../../models/Notification');
const realtime = require('../../../realtime/socket').get('notifications');

const createNotification = async ({ userId, doctorId, title, type }) => {
  let notifierId;
  const rules = {
    title: 'required',
    type: 'required',
  };
  if (type === 'user') {
    notifierId = userId;
    rules.userId = 'required';
  } else if (type === 'doctor') {
    notifierId = doctorId;
    rules.doctorId = 'required';
  } else {
    throw new IzzyLogicErrors('Invalid type');
  }
  const fieldsValidated = await Validator.validateAsync(
    { userId, doctorId, title, type },
    { rules },
  );
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }
  const notification = await notificationSchema.create({
    userId,
    doctorId,
    title,
  });
  //realtime.in(`notifications_${notifierId}`).emit('newNotification', notification);
  return notification;
};
module.exports = createNotification;
