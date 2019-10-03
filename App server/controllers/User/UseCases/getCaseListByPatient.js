const CaseSchema = require('../../../models/Case');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');

const getCaseListByPatient = async ({ patientId, caseStatus = '' }) => {
  const rules = {
    patientId: 'required',
  };

  const fieldsValidated = await Validator.validateAsync({ patientId }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on doctor login', fieldsValidated);
  }
  const searchQuery = {
    patientId,
  };
  if (caseStatus !== '') {
    searchQuery.openClose = caseStatus;
  }
  const caseList = await CaseSchema.find(searchQuery);
  return caseList;
};

module.exports = getCaseListByPatient;
