const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
// const CaseSchema = require('../../../models/Case');
const ConversationSchema = require('../../../models/Conversation');

const GetMessages = async ({ conversationId, from, size }) => {
  const rules = {
    conversationId: 'required',
    from: 'required',
    size: 'required',
  };

  const fieldsValidated = await Validator.validateAsync({ conversationId, from, size }, { rules });
  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Missing Fields', fieldsValidated);
  }

  const conversationExits = await ConversationSchema.findById(conversationId);
  if (!conversationExits) {
    throw new IzzyLogicError('Conversation does not exist');
  }

  const conversations = await ConversationSchema.find(
    { _id: conversationId },
    { messages: { $slice: [from, size] } },
  );
  return conversations;
};

module.exports = GetMessages;
