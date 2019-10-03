const UserModel = require('../../../models/UserModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');

// const propertiesWithValues = require('../../../common/propertiesWithValues');

const updateHealthGoals = async ({ id, healthGoals } = {}) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.NOT_FOUND);
  }

  if (!user.personalUserInfo) {
    user.personalUserInfo = {};
  }

  const { personalUserInfo } = user;

  personalUserInfo.healthGoals = healthGoals;

  await user.save();

  return user.toJSON();
};

module.exports = updateHealthGoals;
