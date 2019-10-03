const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const careTeamSchema = require('../../../models/CareTeam');
const countrySchema = require('../../../models/country');

const assignCareTeamCountry = async ({ country }) => {
  const rules = {
    country: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ country }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }

  const countryLanguage = await countrySchema.findOne({
    name: country,
  });

  const careTeamByCountryLanguage = await careTeamSchema.findOne({
    'languages.name': countryLanguage.language,
    patientNumber: { $lt: 2000 },
  });

  // Todo remove Duplicates from Array
  careTeamByCountryLanguage.countries.push({ name: country });
  await careTeamByCountryLanguage.save();
  return careTeamByCountryLanguage;
};

module.exports = assignCareTeamCountry;
