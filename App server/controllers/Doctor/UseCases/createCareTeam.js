const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const careTeamSchema = require('../../../models/CareTeam');

const createCareTeam = async ({ name }) => {
  const rules = {
    name: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ name }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }
  const careTeamExist = await careTeamSchema.findOne({
    name,
  });
  if (careTeamExist) {
    throw new IzzyLogicError('There is a careteam with this name');
  }
  const careTeam = await careTeamSchema.create({
    name,
  });
  return careTeam.toJSON();
};

module.exports = createCareTeam;
