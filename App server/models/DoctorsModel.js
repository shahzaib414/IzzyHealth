const crypto = require('crypto');
const mongoose = require('mongoose');
const constants = require('../constants');

const { Schema } = mongoose;

const personalUserInfo = new Schema({
  personalDetail: new Schema(
    {
      name: String,
      address: String,
      phone: Number,
      about: String,
      experience: String,
    },
    { _id: false },
  ),
  profileImage: String,
  medicationsWritten: [
    new Schema({
      medicationId: String,
      patientId: String,
      patientName: String,
      tabletsPerDay: String,
      note: String,
    }),
  ],
});

const doctorSchema = new Schema({
  email: String,
  password: String,
  category: String,
  subCategory: String,
  careTeamId: String,
  language: String,
  createdDate: Date,
  userRole: String,
  personalUserInfo,
});

async function login(request) {
  const doctorModel = mongoose.model('Doctor', doctorSchema);
  try {
    const doctor = await doctorModel.findOne({
      email: request.email,
    });
    if (doctor) {
      const hash = crypto
        .pbkdf2Sync(request.password, constants.PASSWORD_ENCRYPTION, 1000, 64, `sha512`)
        .toString(`hex`);
      if (doctor.password === hash) return { success: true, data: doctor };
      return { success: false, msg: 'Invalid Password' };
    }

    return { success: false, msg: "Account Doesn't exist" };
  } catch (err) {
    return { success: false, msg: err.message };
  }
}
module.exports = mongoose.model('Doctor', doctorSchema);
module.exports.login = login;
