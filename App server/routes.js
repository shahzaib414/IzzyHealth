const express = require('express');

const router = express.Router();
const isPatient = require('./middleware/isPatient');
const isDoctor = require('./middleware/isDoctor');

router.use('/Users', isPatient, require('./controllers/User'));
router.use('/Doctors', isDoctor, require('./controllers/Doctor'));
router.use('/Conversation', require('./controllers/Conversation'));
router.use('/Events', require('./controllers/Webhooks'));
router.use('/Notifications', require('./controllers/Notification'));

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.handleReject(err);
});

module.exports = router;
