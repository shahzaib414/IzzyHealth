const { getNotification, updateNotification } = require('./UseCases');

exports.getNotificationsForPatient = async (req, res) => {
  const data = {
    patientId: req.patientId,
    seen: req.query.seen,
    type: 'user',
  };
  const response = await getNotification(data);
  res.json(response);
};
exports.getNotificationsForDoctor = async (req, res) => {
  const data = {
    doctorId: req.doctorId,
    seen: req.query.seen,
    type: 'doctor',
  };
  const response = await getNotification(data);
  res.json(response);
};
exports.updateNotificationStatus = async (req, res) => {
  const response = await updateNotification(req.only('id', 'seen'));
  res.json(response);
};
