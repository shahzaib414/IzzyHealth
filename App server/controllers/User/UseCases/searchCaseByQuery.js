const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const Validator = require('../../../common/validator');
const CaseSchema = require('../../../models/Case');

module.exports = async (searchQuery, patientId) => {
  const rules = {
    searchQuery: 'required',
    patientId: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ searchQuery, patientId }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Error on case search validation', fieldsValidated);
  }
  const results = await CaseSchema.find().or({ subject: { $regex: `.*${searchQuery}.*` } });
  return results;
};
