const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const DoctorModel = require('../../../models/DoctorsModel');
const CaseModel = require('../../../models/Case');
const PrescriptionModel = require('../../../models/prescriptions');

const getPrescriptionModal = async ({ prescriptionId }) => {
  const rules = {
    prescriptionId: 'required',
  };
  const fieldsValidated = await Validator.validateAsync({ prescriptionId }, { rules });

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors', fieldsValidated);
  }
  const prescriptionObject = await PrescriptionModel.findOne({
    _id: prescriptionId,
  });
  const DoctorObject = await DoctorModel.findById(prescriptionObject.doctorId);
  const CaseObject = await CaseModel.findOne({
    prescriptionId,
  });
  return {
    prescription: {
      title: prescriptionObject.title,
      prescription: prescriptionObject.prescription,
      date: prescriptionObject.createdDate,
    },
    doctor: {
      name: DoctorObject.personalUserInfo.personalDetail.name,
    },
    case: {
      description: CaseObject.description,
    },
  };
};
module.exports = getPrescriptionModal;
