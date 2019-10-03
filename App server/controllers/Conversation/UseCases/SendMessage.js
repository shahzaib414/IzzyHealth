/* eslint-disable no-underscore-dangle */
const path = require('path');
const pug = require('pug');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const ConversationSchema = require('../../../models/Conversation');
const DoctorModel = require('../../../models/DoctorsModel');
const UserModel = require('../../../models/UserModel');
const emailSender = require('../../../common/nodemailerSender');
const sockets = require('../../../realtime/socket');

const { createNotification } = require('../../Notification/UseCases');

const SendMessage = async ({ message, conversationId, patientId, doctorId }) => {
  const socketChat = sockets.get('chat'); // this works

  const rules = {
    message: 'required',
    conversationId: 'required',
  };
  const fieldsValidated = await Validator.validateAsync(
    { message, conversationId, patientId, doctorId },
    { rules },
  );

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on doctor login', fieldsValidated);
  }

  let newMessage = {};
  if (typeof message === 'object') {
    newMessage.type = message.type;
    newMessage.fileUrl = message.fileUrl;
  } else {
    newMessage = {
      body: message,
      type: 'text',
      patientId,
      doctorId,
    };
  }

  const conversation = await ConversationSchema.findById(conversationId);
  if (!conversation) {
    throw new IzzyLogicError('Conversation not found');
  }

  conversation.messages.push(newMessage);
  newMessage = {
    ...conversation.messages[conversation.messages.length - 1].toJSON(),
    messageId: conversation.messages[conversation.messages.length - 1]._id,
    conversationId,
  };

  socketChat.in(`chat_${conversationId}`).emit('newMessage', newMessage);
  await conversation.save();

  let notifier;
  if (patientId) {
    notifier = await UserModel.findById(patientId).lean();
  } else {
    notifier = await DoctorModel.findById(doctorId).lean();
  }
  const text = 'New Message Recieved';
  const html = pug.renderFile(
    path.resolve(__dirname, '../../../templates/NewMessage/newMessage.pug'),
    { text },
  );

  await emailSender(
    {
      from: process.env.EMAIL_SENDER,
      to: notifier.email,
      subject: 'New Message',
    },
    { html, text },
  );
  /**
   * Notify user/doctor in App
   */
  const notificationData = {
    // eslint-disable-next-line no-underscore-dangle
    userId: notifier._id,
    title: 'New Message Received',
    type: 'user',
  };
  await createNotification(notificationData);
  return newMessage;
};

module.exports = SendMessage;
