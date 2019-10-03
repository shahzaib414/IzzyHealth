const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
// const IzzyLogicError = require('../../../common/IzzyLogicError');
// const CaseSchema = require('../../../models/Case');
const ConversationSchema = require('../../../models/Conversation');
const DoctorModel = require('../../../models/DoctorsModel');

const getConversationList = async (
  { patientId, from = -1, size },
  { doctorDetail = true } = {},
) => {
  const rules = {
    patientId: 'required',
    from: 'required',
    size: 'required',
  };

  const fieldsValidated = await Validator.validateAsync({ patientId, from, size }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }

  const conversations = await ConversationSchema.find(
    { patientId, status: 'open' },
    { messages: { $slice: [from, size] } },
  ).lean();

  if (doctorDetail) {
    for (const conversation of conversations) {
      const doctor = await DoctorModel.findOne(
        {
          _id: conversation.doctorId,
        },
        { email: 1, 'personalUserInfo.profileImage': 1, 'personalUserInfo.personalDetail.name': 1 },
      ).lean();

      conversation.doctor = doctor;
    }
  }

  return conversations;
};

module.exports = getConversationList;
