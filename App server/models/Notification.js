const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: String,
  doctorId: String,
  title: String,
  seen: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notification', notificationSchema);
