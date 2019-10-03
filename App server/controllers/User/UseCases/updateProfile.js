const Validator = require('../../../common/validator');
const UserModel = require('../../../models/UserModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');

const updateProfileInfo = async ({ objectPath = {}, email, data }) => {
  const rules = {
    email: 'required|email',
    data: 'required',
  };
  try {
    const fieldsValidated = await Validator.validateAsync({ email, data }, { rules });

    if (fieldsValidated !== true) {
      throw new IzzyFieldErrors(IzzyFieldErrors.ERROR_MESSAGES.MISSING_FIELD, fieldsValidated);
    }
    if (Object.keys(objectPath).length > 0) {
      const update = {};
      update[objectPath] = data;
      const patientProfile = await UserModel.findOneAndUpdate(
        {
          email,
        },
        update,
        { new: true },
      );

      if (patientProfile) {
        return { data: patientProfile };
      }
      throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.OPERATION_FAILED);
    } else {
      const patientProfile = await UserModel.findOneAndUpdate(
        {
          email,
        },
        data,
        { new: true },
      );
      if (patientProfile) {
        return { data: patientProfile };
      }
      throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.OPERATION_FAILED);
    }
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
};

module.exports = updateProfileInfo;
