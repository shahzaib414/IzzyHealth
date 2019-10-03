const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');
const propertiesWithValues = require('../common/propertiesWithValues');

module.exports = async ({ conversationId, messageId, doctorId, patientId }, realtime) => {
  realtime
    .in(`chat_${conversationId}`)
    .emit('messageRead', propertiesWithValues({ conversationId, messageId, seen: true }));
  await Conversation.updateOne(
    propertiesWithValues({
      _id: mongoose.Types.ObjectId(conversationId),
      doctorId,
      patientId,
      messages: { $elemMatch: { _id: messageId } },
    }),
    { $set: { 'messages.$.seen': true } },
  );
};
