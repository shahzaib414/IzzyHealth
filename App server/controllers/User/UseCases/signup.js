/* eslint-disable no-underscore-dangle */
const crypto = require('crypto');
const randomString = require('randomstring');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const UserModel = require('../../../models/UserModel');
const constants = require('../../../constants');
const utils = require('../../Utils');
const verificationTokenSchema = require('../../../models/verificationToken');
const Invitation = require('../../../models/Invitation');

const signUp = async ({ email, phone, password, country, sex, dob, referenceCode: referredBy }) => {
  const rules = {
    email: 'required|email',
    phone: 'required',
    country: 'required',
    password: 'required',
    sex: 'required',
    dob: 'required',
  };

  const fieldsValidated = await Validator.validateAsync(
    { email, phone, password, country, sex, dob },
    { rules },
  );

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Field errors on patient sign up', fieldsValidated);
  }

  const userExist = await UserModel.findOne({
    email,
  }).lean();

  if (userExist) {
    throw new IzzyLogicError('User already exist');
  }

  const hash = crypto
    .pbkdf2Sync(password, constants.PASSWORD_ENCRYPTION, 1000, 64, `sha512`)
    .toString(`hex`);

  const referenceCode = randomString.generate(12);

  const newUser = await UserModel.create({
    email,
    password: hash,
    personalUserInfo: {
      personalDetail: {
        phone,
        sex,
      },
      additionalDetails: {},
      medications: [],
    },
    country,
    dob,
    referredBy,
    referenceCode,
    rubies: 10000,
  });

  const verifToken = randomString.generate();

  await verificationTokenSchema.create({
    user_email: email,
    verification_token: verifToken,
  });

  await utils.sendVerificationEmail(email, verifToken);

  if (referredBy) {
    const userReference = await UserModel.findOne({ referenceCode: referredBy }).lean();

    if (userReference && userReference.subscriptionPlan !== 'free') {
      await Invitation.create({
        rerenceCode: referredBy,
        invited: newUser._id,
        inviter: userReference._id,
      });
    }
  }
  return newUser;
};

module.exports = signUp;
