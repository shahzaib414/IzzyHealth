/* eslint-disable no-underscore-dangle */
const path = require('path');
const pug = require('pug');
const Validator = require('../../../common/validator');
const IzzyFieldErrors = require('../../../common/IzzyFieldErrors');
const IzzyLogicErrors = require('../../../common/IzzyLogicError');
const CaseSchema = require('../../../models/Case');
const UserModel = require('../../../models/UserModel');
const DoctorModel = require('../../../models/DoctorsModel');
const emailSender = require('../../../common/nodemailerSender');
const { createNotification } = require('../../Notification/UseCases');
const { CreateConversation } = require('../../Conversation/UseCases');

const createCase = async ({ patientId, caseTypeId, subject, cliente, description, doctorId }) => {
  const rules = {
    patientId: 'required',
    caseTypeId: 'required',
    cliente: 'required',
    doctorId: 'required',
    subject: 'required',
    description: 'required|max:115',
  };

  const fieldsValidated = await Validator.validateAsync(
    { patientId, caseTypeId, subject, cliente, description, doctorId },
    { rules },
  );

  if (fieldsValidated !== true) {
    throw new IzzyFieldErrors(IzzyFieldErrors.ERROR_MESSAGES.MISSING_FIELD, fieldsValidated);
  }

  const user = await UserModel.findById(patientId);
  if (!user) {
    throw new IzzyLogicErrors('User does not exist');
  }
  if (user.createdCases === 1 && user.subscriptionPlan === 'free') {
    throw new IzzyLogicErrors('Free user can only create one Case');
  }
  const createdCase = await CaseSchema.create({
    patientId,
    caseType: caseTypeId,
    dateOfCase: new Date(),
    subject,
    cliente,
    doctorId,
    description,
  });

  const conversation = await CreateConversation({ caseId: createdCase._id, patientId, doctorId });

  user.createdCases += 1;
  const relevantDoctor = await DoctorModel.findById(doctorId);
  const text = 'New Case Created by your Patient';

  const html = pug.renderFile(
    path.resolve(__dirname, '../../../templates/CaseCreated/CaseCreated.pug'),
    { text },
  );

  await emailSender(
    {
      from: process.env.EMAIL_SENDER,
      to: relevantDoctor.email,
      subject: 'New Case',
    },
    { html, text },
  );
  /**
   * Notify Doctor in App
   */
  const notificationData = {
    // eslint-disable-next-line no-underscore-dangle
    userId: relevantDoctor.id,
    title: 'Payment Failure',
    type: 'user',
  };

  await createNotification(notificationData);
  await user.save();
  return { ...createdCase.toObject(), conversationId: conversation._id };
};

module.exports = createCase;
