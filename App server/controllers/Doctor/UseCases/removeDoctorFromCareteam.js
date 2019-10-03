const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const DoctorModel = require('../../../models/DoctorsModel');

const RemoveDoctorFromCareTeam = async ({ DoctorId, careTeamId }) => {
  const rules = {
    DoctorId: 'required',
    careTeamId: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ DoctorId, careTeamId }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }
  const doctor = await DoctorModel.findById(DoctorId);
  if (!doctor) {
    throw new IzzyLogicError('Doctor does not exist');
  }
  if (doctor.careTeamId === '') {
    throw new IzzyLogicError('Doctor not have careTeam');
  }

  doctor.careTeamId = '';
  await doctor.save();
  /**
   * Todo: Implement this business logic
   * As we adding Language to CareTeam depending on Doctor
   * Language
   */
  return doctor;
};

module.exports = RemoveDoctorFromCareTeam;
