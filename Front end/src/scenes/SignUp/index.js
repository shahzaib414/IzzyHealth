import React from 'react';
import './SignUp.scss';

import UserService from '../../services/UserService';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Logo from "../../images/intro/logo.png";

const SignUp = (props) => (
  <div className="SignUp">
    <div className="blue-section" style={{ height: '100%' }}>
      <h2>
        Hey
        <br />
        Be part of
        <br />
        Izzy health
      </h2>
    </div>
    <div className="form-section">
      <div className="form-inner">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>
        <SignUpFormik redirectToVerify={() => props.history.push('/verify-email')} />
      </div>
    </div>
  </div>
);

const Form = (props) => {
  const {
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <label className="izzy-label">Email*</label>
        <input
          name="email"
          type="email"
          className={
            errors.email ? 'izzy-input-required' : 'izzy-input'
          }
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && <div id="feedback">{errors.email}</div>}
      </div>
      <div className="input-box">
        <label className="izzy-label">Password*</label>
        <input
          name="password"
          type="password"
          className={
            errors.password ? 'izzy-input-required' : 'izzy-input'
          }
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && <div id="feedback">{errors.password}</div>}
      </div>
      <div className="input-box">
        <label className="izzy-label">Password Confirmation*</label>
        <input
          name="password_confirmation"
          type="password"
          className={
            errors.password_confirmation ? 'izzy-input-required' : 'izzy-input'
          }
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password_confirmation && touched.password_confirmation && <div id="feedback">{errors.password_confirmation}</div>}
      </div>
      <div className="input-box">
        <label className="izzy-label">Phone*</label>
        <input
          name="phone"
          type="tel"
          className={
            errors.phone ? 'izzy-input-required' : 'izzy-input'
          }
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.phone && touched.phone && <div id="feedback">{errors.phone}</div>}
      </div>
      <div className="input-box">
        <label className="izzy-label">country*</label>
        <select
          className="izzy-input"
          name="country"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="qatar">Qatar</option>
          <option value="Nigeria">Nigeria</option>
          <option value="India">India</option>
          <option value="South Africa">South Africa</option>
          <option value="Ghana">Ghana</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Thailand">Thailand</option>
          <option value="Philippine">Philippine</option>
          <option value="Hongkong">Hongkong</option>
          <option value="guyana">Guyana</option>
          <option value="Colombia">Colombia</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Dominican Republic">Dominican Republic</option>
        </select>
      </div>
      <div className="input-box">
        <label className="izzy-label">Date of birth*</label>
        <input
          name="dob"
          type="date"
          className={
            errors.dob ? 'izzy-input-required' : 'izzy-input'
          }
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errors.dob && touched.dob && <div id="feedback">{errors.dob}</div>}
      </div>
      <div className="input-box">
        <label className="izzy-label">Gender*</label>
        <select
          className="izzy-input"
          name="sex"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <button
        className="button-dark"
        style={{ margin: 'auto', width: '100%'}}
        disabled={isSubmitting || !isValid}
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
}

const SignupSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Phone is required'),
  password: Yup.string()
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  dob: Yup.date()
    .required('Date of birth is required'),
});

const SignUpFormik = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      phone: '',
      country: 'Qatar',
      password: '',
      sex: 'Male',
      password_confirmation: '',
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    UserService.signup(values)
      .then(() => {
        setSubmitting(false);
        props.redirectToVerify();
      })
      .catch(() => {
        setSubmitting(false);
      });
  },
  validationSchema: SignupSchema,
})(Form);

export default withRouter(SignUp);
