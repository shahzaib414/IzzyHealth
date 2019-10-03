const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const UserModel = require('../../../models/UserModel');
const countryForCareteamSchema = require('../../../models/CountryForCareTeam');
const careTeamSchema = require('../../../models/CareTeam');

const assginCareTeam = async ({ pateintId, country }) => {
  const rules = {
    pateintId: 'required',
    country: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ pateintId, country }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }
  const user = await UserModel.findById(pateintId);
  if (!user) {
    throw new IzzyLogicError('User does not exist');
  }

  /**
   * Iterate list of careTeam and get CareTeam ID
   * which has patients less then 2000
   */

  const AllCareTeamIds = await countryForCareteamSchema.find({
    countryName: country,
  });
  if (AllCareTeamIds.length === 0) {
    throw new IzzyLogicError('No care team found in this Country');
  }
  for (const careTeam of AllCareTeamIds) {
    const careTeamObject = await careTeamSchema.findById(careTeam.careTeamId);
    if (careTeamObject.patientNumber < 2000) {
      user.careTeamId = careTeamObject.id;
      break;
    }
    await careTeamObject.save();
  }
  await user.save();
  return user;
};

module.exports = assginCareTeam;
