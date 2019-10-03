const express = require('express');

const router = express.Router();

const catchAsyncErrors = require('../../common/catchAsyncErrors');

const {
  getNotificationsForPatient,
  getNotificationsForDoctor,
  updateNotificationStatus,
} = require('./handlers');

router.get('/get-notification-for-patient', catchAsyncErrors(getNotificationsForPatient));
router.get('/get-notification-for-doctor', catchAsyncErrors(getNotificationsForDoctor));

router.put('/update-status', catchAsyncErrors(updateNotificationStatus));
module.exports = router;
