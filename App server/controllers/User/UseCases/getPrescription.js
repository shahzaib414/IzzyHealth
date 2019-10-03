const PrescriptionModel = require('../../../models/prescriptions');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');

const PageNumber = 0;
const PageSize = 2;

const getPrescription = async ({ patientId }) => {
  const rules = {
    patientId: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ patientId }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on doctor login', fieldsValidated);
  }
  const prescriptionList = await PrescriptionModel.find({ patientId });
  return prescriptionList.slice(PageNumber * PageSize, (PageNumber + 1) * PageSize);
};
module.exports = getPrescription;
