/* eslint-disable no-underscore-dangle */
const DoctorModel = require('../../../models/DoctorsModel');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const Validator = require('../../../common/validator');
const UserModel = require('../../../models/UserModel');
const CaseModel = require('../../../models/Case');
const propertiesWithValues = require('../../../common/propertiesWithValues');

module.exports = async ({ id, caseType, openClose, freeOrPaid, name }) => {
  const rules = {};

  // because caseType and openClose can be optional
  // We add each rule separated
  if (caseType) {
    rules.caseType = 'in:mild,moderate,severe';
  }

  if (openClose) {
    rules.openClose = 'in:open,closed';
  }

  if (freeOrPaid) {
    rules.openClose = 'in:free,paid';
  }

  if (caseType || openClose) {
    const fieldsValidated = await Validator.validateAsync({ caseType, openClose }, { rules });

    if (fieldsValidated !== true) {
      throw new IzzyFieldErrors('Error on case search validation', fieldsValidated);
    }
  }

  if (!id) {
    throw new IzzyLogicError('Id is required');
  }

  const doctor = await DoctorModel.findById(id).lean();

  if (!doctor) {
    throw new IzzyLogicError('Doctor does not exists');
  }

  const validPatients = await UserModel.find(
    propertiesWithValues({
      careTeamId: doctor.careTeamId,
      subscriptionPlan: freeOrPaid
        ? {
            [freeOrPaid === 'free' ? '$eq' : '$ne']: 'free',
          }
        : undefined,
    }),
  ).lean();

  const patientsFree = validPatients
    .filter((patient) => patient.subscriptionPlan === 'free')
    .map((patient) => patient._id);

  const patientsPaid = validPatients
    .filter((patient) => patient.subscriptionPlan !== 'free')
    .map((patient) => patient._id);

  let paidCases = [];
  let freeCases = [];

  if (patientsFree.length) {
    freeCases = await CaseModel.find(
      propertiesWithValues({ patientId: { $in: patientsFree }, name }),
    );
  }

  if (patientsPaid.length) {
    paidCases = await CaseModel.find(
      propertiesWithValues({ patientId: { $in: patientsPaid }, name }),
    );
  }

  return [...paidCases, ...freeCases];
};
