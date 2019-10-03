const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const DoctorModel = require('../../../models/DoctorsModel');
const CareTeamModel = require('../../../models/CareTeam');

const addDoctorToCareteam = async ({ DoctorId, careTeamId }) => {
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
  /**
   *  Filter for Condition: No doctor can
   *  join if already doctor is there of
   *  same category in one Care Team
   */
  const doctorByCareTeam = await DoctorModel.find({
    category: doctor.category,
    careTeamId,
  });
  if (doctorByCareTeam.length > 0) {
    throw new IzzyLogicError(`Careteam already have doctor for ${doctor.category}`);
  }
  doctor.careTeamId = careTeamId;
  await doctor.save();
  const careTeamData = await CareTeamModel.findById(careTeamId);

  // Todo: Need to remove duplicate entries from Language Array

  careTeamData.languages.push({ name: doctor.language });
  await careTeamData.save();
  return doctor;
};

module.exports = addDoctorToCareteam;
