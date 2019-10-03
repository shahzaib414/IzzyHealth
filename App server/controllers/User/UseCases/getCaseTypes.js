const caseType = require('../../../models/caseType');

const getCaseTypes = async () => {
  const caseTypes = await caseType.find();
  return caseTypes;
};

module.exports = getCaseTypes;
