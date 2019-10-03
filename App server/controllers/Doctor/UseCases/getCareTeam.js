const IzzyLogicErrors = require('../../../common/IzzyLogicError');
const CareTeamSchema = require('../../../models/CareTeam');

const getCareTeam = async (searchQuery = {}, SearchType = {}) => {
  if (SearchType === 'ID') {
    const CareTeamByID = await CareTeamSchema.findById(searchQuery);
    if (!CareTeamByID) {
      throw new IzzyLogicErrors(IzzyLogicErrors.ERROR_MESSAGES.NOT_FOUND);
    }
    return CareTeamByID;
  } else if (SearchType === 'COUNTRY') {
    const CareTeamByCountry = await CareTeamSchema.find({
      'countries.name': searchQuery,
    });
    if (!CareTeamByCountry) {
      throw new IzzyLogicErrors(IzzyLogicErrors.ERROR_MESSAGES.NOT_FOUND);
    }
    return CareTeamByCountry;
  }
  const CareTeamAll = await CareTeamSchema.find();
  return CareTeamAll;
};

module.exports = getCareTeam;
