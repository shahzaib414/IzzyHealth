const CaseSchema = require('../../../models/Case');

const getCaseCount = async (patientId) => {
  const count = await CaseSchema.find({ patientId }).count();
  return {
    count,
  };
};

module.exports = getCaseCount;
