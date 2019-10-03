/* eslint-disable no-underscore-dangle */
const { changePassword, forgotPassword } = require('../Shared');

const userSchema = require('../../models/UserModel');
const constant = require('../../constants');
// eslint-disable-next-line import/order
const stripe = require('stripe')(constant.STRIPE_API);
const verificationTokenSchema = require('../../models/verificationToken');
const IzzyLogicError = require('../../common/IzzyLogicError');
// const IzzyFieldErrors = require('../../common/IzzyFieldErrors');
const {
  updateOrCancelPatientBilling,
  updateProfileInfo,
  updateProfilePhoto,
  login,
  changeEmailNotification,
  assginCareTeam,
  signUp,
  createCase,
  getCaseTypes,
  createMembershipPlan,
  getPatient,
  getCaseCount,
  updatePersonalDetails,
  updateAdditionalDetails,
  updateHealthGoals,
  getCaseListByPatient,
  getConversationList,
  searchCaseByQuery,
  getDoctorsByCareTeamId,
  getPrescription,
  getPrescriptionModal,
} = require('./UseCases');

const { searchCases } = require('./UseCases');

exports.LoginPatient = async (request, response) => {
  const data = request.only('email', 'password');
  const loginResponse = await login(data);
  return response.json(loginResponse);
};

exports.validateToken = async (req, res) => {
  return res.json({ success: true });
};
exports.SignUp = async (req, res) => {
  const data = req.only('email', 'phone', 'country', 'password', 'sex', 'dob');
  const response = await signUp({ ...data, referenceCode: req.query.referenceCode });
  return res.json(response);
};

exports.updatePatientProfile = async (request, response) => {
  const updateResponse = await updateProfileInfo(request.only('objectPath', 'email', 'data'));
  response.json(updateResponse);
};

exports.getPatientProfile = async (request, response) => {
  /*
  try {
    if (request.body.email) {
      const update = {};
      update[request.body.objectPath] = request.body.data;
      const patientProfile = await userSchema.find;
      if (patientProfile) response.json({ success: true, data: patientProfile });
    } else {
      // Todo will be fixed when refactored to usecase
      throw new IzzyLogicError(IzzyFieldErrors.ERROR_MESSAGES.MISSING_FIELD);
    }
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
  */
  const patient = await getPatient({ id: request.patientId }, { hidePassword: true });
  return response.json(patient);
};

exports.verifyEmail = async (request, response) => {
  // eslint-disable-next-line prefer-destructuring
  const email = request.query.email;
  // eslint-disable-next-line prefer-destructuring
  const token = request.query.token;

  verificationTokenSchema.findOne({ user_email: email }, (err, model) => {
    if (err) {
      response.json({
        success: false,
        msg: err,
      });
    }
    if (model) {
      if (model.verification_token === token) {
        userSchema
          .findOneAndUpdate(
            {
              email,
            },
            {
              isVerified: true,
            },
          )
          .then(() => {
            response.json({
              success: true,
              msg: 'Your email is verified',
            });
          });
      }
    }
  });
};

exports.createMembershipPlan = async (req, res) => {
  try {
    const data = req.only('email', 'token', 'planId', 'isNewCustomer');
    const response = await createMembershipPlan(data);
    res.json(response);
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
};

exports.reactivateMembershipPlan = async (req, res) => {
  try {
    const data = req.only('email', 'token', 'planId', 'isNewCustomer');
    const response = await createMembershipPlan(data);
    res.json(response);
  } catch (err) {
    throw new IzzyLogicError(err.message);
  }
};

exports.getSubscriptionPlans = async (request, response) => {
  stripe.plans.list({}).then((stripeData) => {
    response.json(stripeData.data);
  });
};
exports.updateMembershipPlan = async (request, response) => {
  const data = { ...request.only('id', 'planId', 'changeToFree') };
  const billingResponse = await updateOrCancelPatientBilling(data);
  response.json(billingResponse);
};
exports.updateProfilePhoto = async (request, response) => {
  const updatePatientProfileResponse = await updateProfilePhoto(
    request.only('profilePhoto', 'id', 'email'),
  );
  response.json(updatePatientProfileResponse);
};

exports.searchCases = async (req, res) => {
  const { caseType, openClose } = req.query;
  const { objectId } = req.params;
  const response = await searchCases({ id: objectId, caseType, openClose });

  return res.json(response);
};

exports.changeClientPassword = async (req, res) => {
  const data = req.only('oldPassword', 'newPassword', 'newPassword_confirmation');

  const response = await changePassword({ id: req.doctorId, ...data }, { type: 'user' });

  return res.json(response);
};

exports.forgotClientPassword = async (req, res) => {
  const response = await forgotPassword({ ...req.only('email') }, { type: 'user' });

  return res.json(response);
};

exports.changeEmailNotification = async (request, response) => {
  const settingsResponse = await changeEmailNotification({
    ...request.only('id', 'email', 'notificationStatus'),
  });
  return response.json(settingsResponse);
};

exports.assginCareTeam = async (req, res) => {
  const data = req.only('pateintId', 'country');
  const response = await assginCareTeam(data);
  return res.json(response);
};

exports.createCase = async (req, res) => {
  const data = req.only('patientId', 'caseTypeId', 'subject', 'cliente', 'description', 'doctorId');
  const response = await createCase(data);
  return res.json(response);
};
exports.getCaseTypes = async (req, res) => {
  const response = await getCaseTypes();
  return res.json(response);
};
exports.getCaseCount = async (req, res) => {
  const response = await getCaseCount(req.patientId);
  return res.json(response);
};

exports.updatePersonalDetails = async (req, res) => {
  const data = req.only('name', 'address', 'weight', 'height', 'phone', 'sex');
  const response = await updatePersonalDetails({ id: req.patientId, ...data });
  return res.json(response);
};

exports.updateAdditionalDetails = async (req, res) => {
  const data = req.only('diet', 'allergies', 'typeOfBlod');
  const response = await updateAdditionalDetails({ id: req.patientId, ...data });
  return res.json(response);
};

exports.updateHealthGoals = async (req, res) => {
  const data = req.only('healthGoals');
  const response = await updateHealthGoals({ id: req.patientId, ...data });
  return res.json(response);
};
exports.getCaseListByPatient = async (req, res) => {
  const { caseStatus } = req.query;
  const data = {
    caseStatus,
    patientId: req.patientId,
  };
  const response = await getCaseListByPatient(data);
  res.json(response);
};

exports.getConversationList = async (req, res) => {
  const from = (req.query && Number(req.query.from)) || -1;
  const size = (req.query && Number(req.query.size)) || 10;

  const conversations = await getConversationList({ from, size, patientId: req.patientId });

  const response = conversations.map((conversation) => ({
    conversationId: conversation._id,
    status: conversation.status,
    lastMessage: conversation.messages[0],
    doctor: conversation.doctor,
  }));

  return res.json(response);
};
exports.searchCaseByQuery = async (req, res) => {
  const response = await searchCaseByQuery(req.query.searchQuery, req.patientId);
  res.json(response);
};
exports.getDoctorsByCareTeamId = async (req, res) => {
  const response = await getDoctorsByCareTeamId(req.query.careTeamId);
  res.json(response);
};
exports.getPrescription = async (req, res) => {
  const response = await getPrescription({ patientId: req.patientId });
  res.json(response);
};
exports.getPrescriptionModal = async (req, res) => {
  const response = await getPrescriptionModal({ prescriptionId: req.query.id });
  res.json(response);
};
