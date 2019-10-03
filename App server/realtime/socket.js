/* eslint-disable no-underscore-dangle */
const socketio = require('socket.io');
const socketioJwt = require('socketio-jwt');
const ConversationModel = require('../models/Conversation');
const readMessage = require('./readMessage');

let io = null;
const sockets = {};

const bootNotification = () => {
  const nsp = io.of('/notifications');
  nsp.on('connection', async (socket) => {
    const { doctorId, patientId, type } = socket.decoded_token;
    if (type === 'patient') {
      socket.join(`notifications_${patientId}`);
    }
    if (type === 'doctor') {
      socket.join(`notifications_${doctorId}`);
    }
  });
  sockets.notification = nsp;
};
const bootChat = () => {
  const nsp = io.of('/chat');
  nsp.use(
    socketioJwt.authorize({
      secret: process.env.KEY_APP,
      handshake: true,
    }),
  );

  nsp.on('connection', async (socket) => {
    console.log('NEW CONVERSATION CONNECTION'); // eslint-disable-line

    const { doctorId, patientId, type } = socket.decoded_token;

    if (type === 'patient') {
      const conversations = await ConversationModel.find({
        status: 'open',
        patientId: socket.decoded_token.patientId,
      }).lean();

      conversations.forEach((conversation) => {
        // console.log('Join to', `chat_${conversation._id}`);
        socket.join(`chat_${conversation._id}`);
        sockets.chat.in(`chat_${conversation._id}`).emit('connected', {
          conversationId: conversation._id,
          patientId: socket.decoded_token.patientId,
        });
      });
    }

    if (type === 'doctor') {
      const conversations = await ConversationModel.find({
        status: 'open',
        doctorId: socket.decoded_token.doctorId,
      }).lean();

      conversations.forEach((conversation) => {
        socket.join(`chat_${conversation._id}`);
        sockets.chat.in(`chat_${conversation._id}`).emit('connected', {});
      });
    }

    socket.on('messageRead', async (data) => {
      const { conversationId, messageId } = data;
      // console.log(data);
      // console.log(conversationId, messageId, patientId, doctorId);

      await readMessage({ conversationId, messageId, patientId, doctorId }, sockets.chat);
    });

    socket.on('disconnect', () => {
      console.log('\x1b[31m%s\x1b[0m', 'NEW DISCONNECTION'); // eslint-disable-line
      // Emit when a new turn is disconnected
      sockets.chat.in('disconnected', { doctorId, patientId });
    });
  });

  sockets.chat = nsp;
};

const boot = (server, options) => {
  io = socketio(server, options || {});
  bootChat();
};

const realtime = {
  init(server, options) {
    boot(server, options || {});
    bootNotification();
  },

  get(key) {
    return sockets[key];
  },
};

module.exports = realtime;
