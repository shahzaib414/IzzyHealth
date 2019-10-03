const path = require('path');
const pug = require('pug');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicError = require('../../../common/IzzyLogicError');
const Validator = require('../../../common/validator');
const CaseModel = require('../../../models/Case');
const UserModel = require('../../../models/UserModel');
const emailSender = require('../../../common/nodemailerSender');

const { createNotification } = require('../../Notification/UseCases');

const closeCase = async (caseId, doctorId) => {
  const rules = {
    caseId: 'required',
    doctorId: 'required',
  };

  const fieldsValidated = await Validator.validateAsync({ caseId, doctorId }, { rules });

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors('Error on case search validation', fieldsValidated);
  }

  const caseResult = await CaseModel.findOne({
    _id: caseId,
    doctorId,
  });

  if (!caseResult) {
    throw new IzzyLogicError(IzzyLogicError.ERROR_MESSAGES.NOT_FOUND);
  }

  const patient = await UserModel.findById(caseResult.patientId);

  const html = pug.renderFile(path.resolve(__dirname, '../../../templates/Events/caseClose.pug'));
  await emailSender(
    { from: process.env.EMAIL_SENDER, to: patient.email, subject: 'case is closed' },
    { html },
  );

  caseResult.openClose = 'closed';
  caseResult.save();
  /**
   * Notify user in App
   */
  const notificationData = {
    // eslint-disable-next-line no-underscore-dangle
    userId: patient._id,
    title: 'Payment Failure',
    type: 'user',
  };
  await createNotification(notificationData);
  return caseResult.toJSON();
};

module.exports = closeCase;
