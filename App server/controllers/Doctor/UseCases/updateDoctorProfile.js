const DoctorModel = require('../../../models/DoctorsModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');

const propertiesWithValues = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') propertiesWithValues(obj[key]);
    // eslint-disable-next-line no-param-reassign
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

const updateDoctorProfile = async ({ id, name, address, phone, about, experience } = {}) => {
  const doctor = await DoctorModel.findById(id);

  if (!doctor) {
    throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.NOT_FOUND);
  }

  if (!doctor.personalUserInfo) {
    doctor.personalUserInfo = {};
  }

  const { personalUserInfo } = doctor;

  const { personalDetail } = personalUserInfo.toObject();

  const profileData = { name, address, phone, about, experience };
  const profileToSave = { ...personalDetail, ...propertiesWithValues(profileData) };

  personalUserInfo.personalDetail = profileToSave;

  await doctor.save();

  return doctor.toJSON();
};

module.exports = updateDoctorProfile;
