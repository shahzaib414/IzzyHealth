const IzzyLogicErrors = require('../../../common/IzzyLogicError');
const DoctorSchema = require('../../../models/DoctorsModel');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');

const getDoctorsByCareTeamId = async (careTeamId) => {
  const rules = {
    careTeamId: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ careTeamId }, { rules });

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on doctor login', fieldsValidated);
  }
  const doctors = await DoctorSchema.find({
    careTeamId,
  });
  if (!doctors) {
    throw new IzzyLogicErrors(IzzyLogicErrors.ERROR_MESSAGES.NOT_FOUND);
  }
  return doctors;
};
module.exports = getDoctorsByCareTeamId;
