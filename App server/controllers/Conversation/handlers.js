const fs = require('fs');
const cloudinary = require('cloudinary');
const IzzyLogicError = require('../../common/IzzyLogicError');
const { CreateConversation, SendMessage, GetMessages } = require('./UseCases');

exports.CreateConversation = async (req, res) => {
  const data = req.only('caseId', 'patientId', 'doctorId');
  const response = await CreateConversation({
    ...data,
    patientId: req.patientId,
  });
  res.json(response);
};

exports.SendMessage = async (req, res) => {
  const { file } = req;

  if (file) {
    const message = {};

    try {
      const type = file.mimetype; // image/png image/jpg
      message.type = type;

      if (type.split('/')[0] === 'image') {
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(file.path, {
          resource_type: 'image',
          public_id: `photo-${file.filename}`,
        });

        message.fileUrl = cloudinaryResponse.secure_url;
        fs.unlinkSync(file.path);
      } else {
        message.fileUrl = req.file.path;
      }
    } catch (error) {
      throw new IzzyLogicError(error.message);
    }

    req.body.message = message;
  }

  const data = req.only('message', 'conversationId');

  const response = await SendMessage({
    ...data,
    patientId: req.patientId,
    doctorId: req.doctorId,
    realtime: req.socketChat,
  });
  res.json(response);
};

exports.GetMessages = async (req, res) => {
  const data = req.params.conversationId;
  const from = (req.query && Number(req.query.from)) || 0;
  const size = (req.query && Number(req.query.size)) || 10;
  const getMessages = await GetMessages({ conversationId: data, from, size });
  res.json(getMessages);
};
