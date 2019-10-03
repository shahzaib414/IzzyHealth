const IzzyLogicError = require('../../../common/IzzyLogicError');
const CareTeamModel = require('../../../models/CareTeam');

const getCountriesByCareTeamID = async (id) => {
  /**
   * Todo: Add Validator for Query Params
   */
  if (!id) {
    throw new IzzyLogicError('id is not provided');
  }
  const CareTeam = await CareTeamModel.findById(id);
  if (!CareTeam) {
    throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.NOT_FOUND);
  }
  return CareTeam.countries;
};

module.exports = getCountriesByCareTeamID;
