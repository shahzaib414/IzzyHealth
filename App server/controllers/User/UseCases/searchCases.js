const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const Validator = require('../../../common/validator');
const UserModel = require('../../../models/UserModel');
const CaseModel = require('../../../models/Case');
const propertiesWithValues = require('../../../common/propertiesWithValues');

module.exports = async ({ id, caseType, openClose }) => {
  const rules = {};

  // because caseType and openClose can be optional
  // We add each rule separated
  if (caseType) {
    rules.caseType = 'in:mild,moderate,severe';
  }

  if (openClose) {
    rules.openClose = 'in:open,closed';
  }

  if (caseType || openClose) {
    const fieldsValidated = await Validator.validateAsync({ caseType, openClose }, { rules });

    if (fieldsValidated !== true) {
      throw new IzzyFieldErrors('Error on case search validation', fieldsValidated);
    }
  }

  const patient = await UserModel.findById(id);

  if (!patient) {
    throw new IzzyLogicError('Patient does not exists');
  }

  const cases = await CaseModel.find(propertiesWithValues({ patientId: id, caseType, openClose }));

  return cases;
};
