const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const prescriptionSchema = mongoose.Schema({
  patientId: String,
  doctorId: String,
  title: String,
  prescription: String,
  createdDate: Date,
});
prescriptionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Prescription', prescriptionSchema);
