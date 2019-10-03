const UserModel = require('../../../models/UserModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');

// const propertiesWithValues = require('../../../common/propertiesWithValues');

const updateAdditionalDetails = async ({ id, diet, allergies, typeOfBlod } = {}) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.NOT_FOUND);
  }

  if (!user.personalUserInfo) {
    user.personalUserInfo = {};
  }

  const { personalUserInfo } = user;

  const { additionalDetails } = personalUserInfo.toObject();

  const profileData = { diet, allergies, typeOfBlod };
  const profileToSave = { ...additionalDetails, ...profileData };

  personalUserInfo.additionalDetails = profileToSave;

  await user.save();

  return user.toJSON();
};

module.exports = updateAdditionalDetails;
