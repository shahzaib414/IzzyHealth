const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const DoctorModel = require('../../models/DoctorsModel');
const UserModel = require('../../models/UserModel');
const decodeToken = require('../decodeToken');

describe('Creating a json web token', () => {
  let user;
  let doctor;
  beforeAll(async () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
    // TO DO needed a UseCase for Doctor Creating that hash password inside it
    const [doctors] = await DoctorModel.find();
    if (!doctors) {
      const newDoctor = await DoctorModel.create({ email: 'test@izzyhealt.test' });

      doctor = newDoctor;
    } else {
      doctor = doctors;
    }

    const [users] = await UserModel.find();
    if (!users) {
      const newUser = await UserModel.create({ email: 'testPatient@izzyhealt.test' });

      user = newUser;
    } else {
      user = users;
    }
  });

  test('creating a user token', async () => {
    const token = jwt.sign({ patientId: user.id, type: 'patient' }, process.env.KEY_APP, {
      expiresIn: '48h',
    });
    const decoded = await decodeToken(token);

    expect(token).toBeDefined();
    expect(decoded).toBeObject();
    expect(decoded.patientId).toBe(user.id);
    expect(decoded.type).toBe('patient');

    console.log('User token', token); // eslint-disable-line
  });

  test('creating a doctor token', async () => {
    const token = jwt.sign({ doctorId: doctor.id, type: 'doctor' }, process.env.KEY_APP, {
      expiresIn: '48h',
    });
    const decoded = await decodeToken(token);

    expect(token).toBeDefined();
    expect(decoded).toBeObject();
    expect(decoded.doctorId).toBe(doctor.id);
    expect(decoded.type).toBe('doctor');

    console.log('Doctor token', token); // eslint-disable-line
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
