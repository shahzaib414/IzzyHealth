const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const catchAsyncErrors = require('../../common/catchAsyncErrors');

const { EventHandler } = require('./EventHandler');

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  catchAsyncErrors(EventHandler),
);

module.exports = router;
