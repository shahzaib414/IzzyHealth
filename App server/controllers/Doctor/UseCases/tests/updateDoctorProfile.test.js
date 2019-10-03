/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const DoctorModel = require('../../../../models/DoctorsModel');
const updateDoctorProfile = require('../updateDoctorProfile');

const hasNeededData = (doctor) => {
  expect(doctor).toBeDefined();
  expect(doctor.personalUserInfo).toBeDefined();
  expect(doctor.personalUserInfo.personalDetail).toBeDefined();
};

describe('testing Doctor update profile', () => {
  const initialDoctorValues = {
    email: 'test@izzyhealth.org',
    password: '123abc',
    category: 'category',
    subCategory: 'subCategory',
    careTeamId: 1,
    createdDate: Date.now(),
    userRole: 'doctor',
  };

  const firstUpdateData = {
    name: 'Test test',
    about: 'Im just a test doctor unit test',
    experience: 'beginner',
  };

  const secondUpdateData = {
    name: 'Test test edited',
    about: 'Im just a test doctor unit test edited',
  };

  const thirdUpdateData = {
    experience: 'Test test edited',
  };

  beforeAll(async () => {
    mongoose.connect(process.env.MONGODB_URL_TEST, { useNewUrlParser: true });
    // TO DO needed a UseCase for Doctor Creating that hash password inside it
    const doctor = await DoctorModel.create(initialDoctorValues);

    initialDoctorValues.id = doctor.id;
  });

  test('Adding name, experience and about to Doctor', async () => {
    const response = await updateDoctorProfile({ id: initialDoctorValues.id, ...firstUpdateData });

    hasNeededData(response);
    expect(response.personalUserInfo.personalDetail.name).toBe(firstUpdateData.name);
    expect(response.personalUserInfo.personalDetail.about).toBe(firstUpdateData.about);
    expect(response.personalUserInfo.personalDetail.experience).toBe(firstUpdateData.experience);
  });

  test('Updating just name and about to Doctor', async () => {
    const response = await updateDoctorProfile({ id: initialDoctorValues.id, ...secondUpdateData });

    hasNeededData(response);
    expect(response.personalUserInfo.personalDetail.name).toBe(secondUpdateData.name);
    expect(response.personalUserInfo.personalDetail.about).toBe(secondUpdateData.about);
    expect(response.personalUserInfo.personalDetail.experience).toBe(firstUpdateData.experience);
  });

  test('Updating only experience to Doctor', async () => {
    const response = await updateDoctorProfile({ id: initialDoctorValues.id, ...thirdUpdateData });

    hasNeededData(response);
    expect(response.personalUserInfo.personalDetail.name).toBe(secondUpdateData.name);
    expect(response.personalUserInfo.personalDetail.about).toBe(secondUpdateData.about);
    expect(response.personalUserInfo.personalDetail.experience).toBe(thirdUpdateData.experience);
  });

  afterAll(async () => {
    await DoctorModel.deleteOne({ _id: initialDoctorValues.id });
    await mongoose.connection.close();
  });
});
