const mongoose = require('mongoose');
// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const personalUserInfo = new Schema({
  personalDetail: new Schema({
    name: String,
    address: String,
    weight: Number,
    height: Number,
    sex: String,
    phone: Number,
  }),
  additionalDetails: new Schema({
    diet: String,
    allergies: String,
    typeOfBlod: String,
  }),
  healthGoals: String,
  profileImage: String,
  medications: [
    new Schema({
      medicationId: Number,
      doctor: String,
      medicineName: String,
      tabletsPerDay: String,
      note: String,
    }),
  ],
});
const userSchema = new Schema({
  referenceCode: String,
  referredBy: String,
  email: String,
  userRole: String,
  country: String,
  personalUserInfo,
  careTeamId: String,
  rubies: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  password: String,
  subscriptionPlan: { type: String, default: 'free' },
  subscriptionExpireDate: Date,
  stripeID: String,
  emailNotification: { type: Boolean, default: true },
  dob: String,
  createdCases: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
