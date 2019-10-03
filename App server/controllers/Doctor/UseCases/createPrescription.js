const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const prescriptionModel = require('../../../models/prescriptions');
const CaseModel = require('../../../models/Case');

const createPrescription = async ({ doctorId, patientId, title, prescription, caseId }) => {
  const rules = {
    doctorId: 'required',
    patientId: 'required',
    title: 'required',
    prescription: 'required',
    caseId: 'required',
  };
  const fieldsValidated = await Validator.validateAsync(
    { doctorId, patientId, title, prescription, caseId },
    { rules },
  );
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors', fieldsValidated);
  }
  const prescriptionObject = await prescriptionModel.create({
    doctorId,
    patientId,
    title,
    prescription,
    createdDate: new Date(),
  });
  const caseObject = await CaseModel.findById(caseId);
  caseObject.prescriptionId.push(prescriptionObject.id);
  await caseObject.save();

  return prescriptionObject;
};

module.exports = createPrescription;
