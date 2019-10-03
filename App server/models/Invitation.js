const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const Invitation = new Schema({
  rerenceCode: String,
  status: { type: String, default: 'pending' },
  inviterStatus: { type: String, default: 'pending' },
  invitedStatus: { type: String, default: 'pending' },
  inviter: Schema.Types.ObjectId,
  invited: Schema.Types.ObjectId,
});

module.exports = model('Invitation', Invitation);
