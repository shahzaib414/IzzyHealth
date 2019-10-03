const { changePassword, forgotPassword } = require('../Shared');

const {
  updateDoctorProfile,
  getDoctor,
  login,
  createDoctor,
  updateProfilePhoto,
  createCareTeam,
  assignCareTeamCountry,
  addDoctorToCareteam,
  removeDoctorFromCareTeam,
  getCareTeam,
  getCountriesByCareTeamID,
  searchCaseByDoctor,
  closeCase,
  createPrescription,
} = require('./UseCases');

exports.LoginDoctor = async (request, response) => {
  const data = request.only('email', 'password');

  const loginResponse = await login(data);
  return response.json(loginResponse);
};

exports.profileDoctor = async (req, res) => {
  const data = { ...req.only('name', 'address', 'about', 'experience'), id: req.doctorId };
  const response = await updateDoctorProfile(data);

  return res.json(response);
};

exports.getDoctorProfile = async (req, res) => {
  const response = await getDoctor({ id: req.doctorId }, { hidePassword: true });

  return res.json(response.personalUserInfo);
};
exports.updateProfilePhoto = async (request, response) => {
  const updateDoctorProfileResponse = await updateProfilePhoto(
    request.only('profilePhoto', 'id', 'email'),
  );
  response.json(updateDoctorProfileResponse);
};
exports.createDoctor = async (req, res) => {
  const data = req.only('email', 'password', 'password_confirmation', 'category', 'subCategory');

  const response = await createDoctor(data);

  return res.json(response);
};

exports.changeDoctorPassword = async (req, res) => {
  const data = req.only('oldPassword', 'newPassword', 'newPassword_confirmation');

  const response = await changePassword({ id: req.doctorId, ...data }, { type: 'doctor' });

  return res.json(response);
};

exports.forgotDoctorPassword = async (req, res) => {
  const response = await forgotPassword({ ...req.only('email') }, { type: 'doctor' });

  return res.json(response);
};
exports.createCareTeam = async (req, res) => {
  const data = req.only('name');
  const response = await createCareTeam(data);
  return res.json(response);
};
exports.assignCareTeamCountry = async (req, res) => {
  const data = req.only('country');
  const response = await assignCareTeamCountry(data);
  return res.json(response);
};
exports.addDoctorToCareteam = async (req, res) => {
  const data = req.only('DoctorId', 'careTeamId');
  const response = await addDoctorToCareteam(data);
  return res.json(response);
};
exports.removeDoctorFromCareTeam = async (req, res) => {
  const data = req.only('DoctorId', 'careTeamId');
  const response = await removeDoctorFromCareTeam(data);
  return res.json(response);
};
exports.getCareTeamByQuery = async (req, res) => {
  const response = await getCareTeam(req.params.searchQuery, req.params.searchType);
  return res.json(response);
};
exports.getCareTeam = async (req, res) => {
  const response = await getCareTeam();
  return res.json(response);
};
exports.getCountriesByCareTeamID = async (req, res) => {
  const response = await getCountriesByCareTeamID(req.params.id);
  return res.json(response);
};

exports.searchCase = async (req, res) => {
  const { caseType, openClose, freeOrPaid, name } = req.query;

  const response = await searchCaseByDoctor({
    id: req.doctorId,
    caseType,
    openClose,
    freeOrPaid,
    name,
  });
  res.json(response);
};

exports.closeCase = async (req, res) => {
  const response = await closeCase(req.body.caseId, req.doctorId);
  res.json(response);
};
exports.createPrescription = async (req, res) => {
  const data = {
    ...req.only('patientId', 'title', 'prescription', 'caseId'),
    doctorId: req.doctorId,
  };
  const response = await createPrescription(data);
  res.json(response);
};
