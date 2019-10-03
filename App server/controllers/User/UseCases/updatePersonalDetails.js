const UserModel = require('../../../models/UserModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');

// const propertiesWithValues = require('../../../common/propertiesWithValues');

const updatePersonalDetail = async ({ id, name, address, weight, height, phone, sex } = {}) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.NOT_FOUND);
  }

  if (!user.personalUserInfo) {
    user.personalUserInfo = {};
  }

  const { personalUserInfo } = user;

  const { personalDetail } = personalUserInfo.toObject();

  const profileData = { name, address, phone, weight, height, sex };
  const profileToSave = { ...personalDetail, ...profileData };

  personalUserInfo.personalDetail = profileToSave;

  await user.save();

  return user.toJSON();
};

module.exports = updatePersonalDetail;
