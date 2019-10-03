const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

const catchAsyncErrors = require('../../common/catchAsyncErrors');

const { CreateConversation, SendMessage, GetMessages } = require('./handlers');

router.post('/create-conversation', catchAsyncErrors(CreateConversation));

router.put('/send-message', upload.single('file'), catchAsyncErrors(SendMessage));

router.get('/:conversationId', catchAsyncErrors(GetMessages));
module.exports = router;
