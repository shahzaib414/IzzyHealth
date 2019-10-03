/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const DoctorModel = require('../../../../models/DoctorsModel');
const getDoctor = require('../getDoctor');

describe('Get doctor use case', () => {
  let doctorId;
  const email = 'testGetDoctor@izzyhealt.org';
  beforeAll(async () => {
    mongoose.connect(process.env.MONGODB_URL_TEST, { useNewUrlParser: true });
    // TO DO needed a UseCase for Doctor Creating that hash password inside it
    const doctor = await DoctorModel.create({
      email,
      password: '123455',
    });

    doctorId = doctor.id;
  });

  test('find a doctor by Id', async () => {
    try {
      const doctor = await getDoctor({ id: doctorId });

      expect(doctor).toBeDefined();
      expect(doctor.email).toBe(email);
      expect(doctor.password).toBeDefined();
    } catch (error) {
      expect(false).toBeTruthy();
      await mongoose.connection.close();
    }
  });

  test('find a doctor by Id, hidding password', async () => {
    try {
      const doctor = await getDoctor({ id: doctorId }, { hidePassword: true });

      expect(doctor).toBeDefined();
      expect(doctor.email).toBe(email);
      expect(doctor.password).toBeUndefined();
    } catch (error) {
      expect(false).toBeTruthy();
      await mongoose.connection.close();
    }
  });

  afterAll(async () => {
    await DoctorModel.deletOne({ _id: doctorId });
    await mongoose.connection.close();
  });
});
