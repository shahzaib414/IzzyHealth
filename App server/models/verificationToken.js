const mongoose = require('mongoose');

const { Schema } = mongoose;

const verificationTokenSchema = new Schema({
  user_email: String,
  verification_token: String,
});
module.exports = mongoose.model('VerificationToken', verificationTokenSchema);
