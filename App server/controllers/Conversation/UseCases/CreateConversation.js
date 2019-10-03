const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const CaseSchema = require('../../../models/Case');
const UserModel = require('../../../models/UserModel');
const DoctorModel = require('../../../models/DoctorsModel');
const ConversationSchema = require('../../../models/Conversation');

// Todo: Send notification to Doctor once conversation is created
const CreateConversation = async ({ caseId, patientId, doctorId }) => {
  const rules = {
    caseId: 'required',
    patientId: 'required',
    doctorId: 'required',
  };

  const fieldsValidated = await Validator.validateAsync({ caseId, patientId, doctorId }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }

  const patientExist = await UserModel.findById(patientId);
  if (!patientExist) {
    throw new IzzyLogicError('Patient does not exist');
  }

  const doctorExist = await DoctorModel.findById(doctorId);
  if (!doctorExist) {
    throw new IzzyLogicError('Doctor does not exist');
  }

  const caseExist = await CaseSchema.findById(caseId);
  if (!caseExist) {
    throw new IzzyLogicError('Case does not exist');
  }

  const createdConv = await ConversationSchema.create({
    caseId,
    patientId,
    doctorId,
    createdDate: new Date(),
  });

  return createdConv;
};

module.exports = CreateConversation;
