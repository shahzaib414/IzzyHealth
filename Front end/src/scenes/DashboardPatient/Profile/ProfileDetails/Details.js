import React from "react";

import UserService from '../../../../services/UserService';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const Details = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  values,
}) => {
  return (
    <form className="personal-details">
      <div className="personal-details-header">
        <h4>Personal Details</h4>
        <span className="edit-details" onClick={handleSubmit}>Edit</span>
      </div>
      <div className="personal-details-body">
        <div className="input-box">
          <input
            type="text"
            placeholder="Full Name*"
            className={
              errors.name && touched.name ? 'izzy-input-required' : 'izzy-input'
            }
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email*"
            className={
              errors.email ? 'izzy-input-required' : 'izzy-input'
            }
            value={values.email}
            name="email"
            disabled
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Phone No*"
            className={
              errors.phone && touched.phone ? 'izzy-input-required' : 'izzy-input'
            }
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            name="phone"
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Address"
            className={
              errors.address && touched.address ? 'izzy-input-required' : 'izzy-input'
            }
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            name="address"
          />
        </div>
      </div>
      <div className="personal-details-body health-details">
        <div className="input-boxes">
          <div className="input-box">
            <input
              type="number"
              placeholder="1.72 cm"
              className={
                errors.height && touched.height ? 'izzy-input-required' : 'izzy-input'
              }
              value={values.height}
              onChange={handleChange}
              onBlur={handleBlur}
              name="height"
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              placeholder="80 kg*"
              className={
                errors.weight && touched.weight ? 'izzy-input-required' : 'izzy-input'
              }
              value={values.weight}
              onChange={handleChange}
              onBlur={handleBlur}
              name="weight"
            />
          </div>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Very Good*"
            className="izzy-input"
            value={values.veryGood}
            onChange={handleChange}
            onBlur={handleBlur}
            name="veryGood"
          />
        </div>
      </div>
    </form>
  );
};

const detailSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Phone is required'),
  name: Yup.string()
    .required('Full name is required'),
  weight: Yup.number('Invalid value for weight')
    .required('Weight is required'),
  height: Yup.number('Invalid value for height'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  // address is not required
  // very good ?
});

const DetailsWithFormik = withFormik({
  mapPropsToValues: ({
    name,
    sex,
    address,
    phone,
    weight,
    height,
    email
  }) => {
    return {
      email,
      name,
      sex,
      address,
      phone,
      weight,
      height,
      veryGood: '',
    };
  },
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    UserService.updatePersonalDetail({ ...values, sex: props.sex })
      .then(({ data }) => {
        // console.log(data);
        props.updateNameProfile(values.name);
      });
  },
  validationSchema: detailSchema,
})(Details);

export default DetailsWithFormik;
