const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const notificationSchema = require('../../../models/Notification');

const updateNotification = async ({ id, seen }) => {
  const rules = {
    seen: 'required',
    id: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ id, seen }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }
  const notificationUpdate = await notificationSchema.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      seen,
    },
    { new: true },
  );
  return notificationUpdate;
};
module.exports = updateNotification;
