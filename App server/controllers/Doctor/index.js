const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// This middleware helper will help us catch errors with express
// when they come from async functions

const catchAsyncErrors = require('../../common/catchAsyncErrors');

const {
  LoginDoctor,
  profileDoctor,
  getDoctorProfile,
  createDoctor,
  changeDoctorPassword,
  forgotDoctorPassword,
  updateProfilePhoto,
  createCareTeam,
  assignCareTeamCountry,
  addDoctorToCareteam,
  removeDoctorFromCareTeam,
  getCareTeamByQuery,
  getCareTeam,
  getCountriesByCareTeamID,
  searchCase,
  closeCase,
  createPrescription,
} = require('./handlers');

router.post('/login', catchAsyncErrors(LoginDoctor));
router.post('/create', catchAsyncErrors(createDoctor));

router.put('/profile', catchAsyncErrors(profileDoctor));
router.get('/profile', catchAsyncErrors(getDoctorProfile));

router.post('/forgot-password', catchAsyncErrors(forgotDoctorPassword));
router.post('/change-password', catchAsyncErrors(changeDoctorPassword));

router.post('/create-careteam', catchAsyncErrors(createCareTeam));
router.post('/assign-careteam-country', catchAsyncErrors(assignCareTeamCountry));
router.post('/add-doctor-to-careteam', catchAsyncErrors(addDoctorToCareteam));
router.post('/remove-doctor-from-careteam', catchAsyncErrors(removeDoctorFromCareTeam));
router.post('/create-prescription', catchAsyncErrors(createPrescription));

router.get('/get-careteam/:searchQuery/:searchType', catchAsyncErrors(getCareTeamByQuery));
router.get('/get-careteam', catchAsyncErrors(getCareTeam));
router.get('/get-countries-by-careteam/:id', catchAsyncErrors(getCountriesByCareTeamID));
router.get('/search', catchAsyncErrors(searchCase));
router.put('/close-case', catchAsyncErrors(closeCase));

router.post(
  '/upload-profile-photo',
  upload.single('profilePhoto'),
  catchAsyncErrors(updateProfilePhoto),
);
module.exports = router;
