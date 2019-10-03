const DoctorModel = require('../../../models/DoctorsModel');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const propertiesWithValues = require('../../../common/propertiesWithValues');

const getDoctor = async ({ id, email }, { hidePassword } = {}) => {
  if (!id && !email) {
    throw new IzzyLogicError('Search params are required. id or email');
  }

  const searchParams = {
    _id: id,
    email,
  };

  let doctor = await DoctorModel.findOne(propertiesWithValues(searchParams));

  if (!doctor) {
    throw new IzzyLogicError('Doctor does not exist');
  }

  doctor = doctor.toJSON();

  if (hidePassword) {
    delete doctor.password;
  }

  return doctor;
};

module.exports = getDoctor;
