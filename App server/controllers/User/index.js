const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// This middleware helper will help us catch errors with express
// when they come from async functions

const catchAsyncErrors = require('../../common/catchAsyncErrors');

// Destructuring
const {
  SignUp,
  LoginPatient,
  createMembershipPlan,
  reactivateMembershipPlan,
  verifyEmail,
  getSubscriptionPlans,
  updatePatientProfile,
  getPatientProfile,
  searchCases,
  updateMembershipPlan,
  forgotClientPassword,
  changeClientPassword,
  updateProfilePhoto,
  changeEmailNotification,
  assginCareTeam,
  createCase,
  getCaseTypes,
  validateToken,
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
} = require('./handlers');

router.post('/sign-up', catchAsyncErrors(SignUp));
router.post('/login', catchAsyncErrors(LoginPatient));

router.post('/create-membership-plan', catchAsyncErrors(createMembershipPlan));
router.post('/reactivate-membership-plan', catchAsyncErrors(reactivateMembershipPlan));
router.post('/update-billing', catchAsyncErrors(updateMembershipPlan));

router.get('/verify-email', catchAsyncErrors(verifyEmail));
router.post('/settings/change-email-notification', catchAsyncErrors(changeEmailNotification));

router.get('/get-subscription-plans', catchAsyncErrors(getSubscriptionPlans));
router.put('/update-pateint-profile', catchAsyncErrors(updatePatientProfile));
router.get('/profile', catchAsyncErrors(getPatientProfile));

router.get('/:objectId/cases', catchAsyncErrors(searchCases));

router.post('/forgot-password', catchAsyncErrors(forgotClientPassword));
router.post('/change-password', catchAsyncErrors(changeClientPassword));
router.post('/assgin-careteam', catchAsyncErrors(assginCareTeam));
router.get('/get-doctors-by-careteam', catchAsyncErrors(getDoctorsByCareTeamId));
router.post('/create-case', catchAsyncErrors(createCase));
router.get('/get-casetypes', catchAsyncErrors(getCaseTypes));
router.get('/get-case-count', catchAsyncErrors(getCaseCount));
router.post('/update-personal-detail', catchAsyncErrors(updatePersonalDetails));
router.post('/update-additional-detail', catchAsyncErrors(updateAdditionalDetails));
router.post('/update-healtGoals', catchAsyncErrors(updateHealthGoals));
router.get('/search-case', catchAsyncErrors(searchCaseByQuery));
router.get('/get-prescription', catchAsyncErrors(getPrescription));
router.get('/getprescription-modal', catchAsyncErrors(getPrescriptionModal));

router.get('/validate', catchAsyncErrors(validateToken));
router.get('/get-case-list', catchAsyncErrors(getCaseListByPatient));
router.get('/conversation-list', catchAsyncErrors(getConversationList));
router.post(
  '/upload-profile-photo',
  upload.single('profilePhoto'),
  catchAsyncErrors(updateProfilePhoto),
);
module.exports = router;
