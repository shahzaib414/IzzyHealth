const UserModel = require('../../../models/UserModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const propertiesWithValues = require('../../../common/propertiesWithValues');

const getPatient = async ({ id, email }, { hidePassword } = {}) => {
  if (!id && !email) {
    throw new IzzyLogicError('Search params are required. id or email');
  }

  const searchParams = {
    _id: id,
    email,
  };

  const user = await UserModel.findOne(propertiesWithValues(searchParams)).lean();
  if (!user) {
    throw new IzzyLogicError('User does not exist ');
  }

  if (hidePassword) {
    delete user.password;
  }

  return user;
};

module.exports = getPatient;
