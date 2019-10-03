const path = require('path');
const randomstring = require('randomstring');
const pug = require('pug');
const emailSender = require('../../common/nodemailerSender');
const DoctorModel = require('../../models/DoctorsModel');
const UserModel = require('../../models/UserModel');
const IzzyLogicError = require('../../common/IzzyLogicError');
const hasher = require('../../common/hasher');

const USER_TYPE = 'user';
const DOCTOR_TYPE = 'doctor';

const forgotPassword = async ({ email }, { type }) => {
  if (!email) {
    throw new IzzyLogicError('email is required');
  }

  if (!type) {
    throw new IzzyLogicError('type is required');
  }

  if (![USER_TYPE, DOCTOR_TYPE].includes(type)) {
    throw new IzzyLogicError(`type must be ${USER_TYPE} or ${DOCTOR_TYPE}`);
  }

  let EntityModel;

  if (type === DOCTOR_TYPE) {
    EntityModel = DoctorModel;
  }
  if (type === USER_TYPE) {
    EntityModel = UserModel;
  }

  const patientOrDoctor = await EntityModel.findOne({ email });

  if (!patientOrDoctor) {
    throw new IzzyLogicError(`${type} not found`);
  }

  const newPassword = randomstring.generate(8);
  const hash = hasher.encrypt(newPassword);

  patientOrDoctor.password = hash;
  patientOrDoctor.save();

  const html = pug.renderFile(
    path.resolve(__dirname, '../../templates/forgotPassword/forgotPassword.pug'),
    { newPassword },
  );

  await emailSender(
    { from: process.env.EMAIL_SENDER, to: patientOrDoctor.email, subject: 'Forgot email' },
    { html },
  );

  return { message: `An email was sent to ${patientOrDoctor.email}` };
};

module.exports = forgotPassword;
