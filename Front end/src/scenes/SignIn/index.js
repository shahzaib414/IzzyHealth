import React, { useState } from "react";
import "./SignIn.scss";
import { withRouter, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { withFormik, Field } from "formik";
import { Layout, Select } from "antd";
import UserService from "../../services/UserService";
import DoctorService from "../../services/DoctorService";
import Logo from "../../images/intro/logo.png";

const { Option } = Select;
const AntLayout = Layout.Content;

const Login = (props) => (
<div className="SignIn">
        <div className="blue-section">
          <h2>
            Hey
            <br />
            Welcome
            <br />
            Back
          </h2>
        </div>
        <div className="form-section">
          <div className="form-inner">
            <Link to="/" className="logo">
              <img src={Logo} alt="logo" />
            </Link>
            <AntLayout>
              <LoginFormWithFormik redirectToVerify={() => props.history.push('/dashboard-patient')}/>
            </AntLayout>
            <p className="alternate-text">
              Don't have an account ? <Link to="/sign-up">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
);



const LoginForm = props => {
  const { values, errors,handleChange, handleSubmit,setFieldValue } = props;
  return (
    <>
      <form>
        <div className="input-box">
          <label className="izzy-label">Email*</label>  
             <input
            type="text"
            className="izzy-input"
            required
            value={values.email}
            onChange={handleChange}
            name="email"
          />
          {errors.email && <div id="feedback">{errors.email}</div>}
        </div>
        <div className="input-box">
          <label className="izzy-label">Password*</label>
          <input
            type="password"
            className="izzy-input"
            required
            value={values.password}
            onChange={handleChange}
            name="password"
          />
          {errors.password && <div id="feedback">{errors.password}</div>}
        </div>
        <div className="input-box">
          <label class="styled-input">
            <input type="checkbox" required onChange={handleChange}
            value = {values.rememberMe} />
            <div className="styled-checkbox"></div>
            Remember me
          </label>
          <br/>
          <div className="signin-type">
          
          <Select defaultValue="patient" onChange={value => setFieldValue("type", value)}
          value={values.type}>
            <Option value="patient">Patient</Option>
            <Option value="Doctor">Doctor</Option>
          </Select>
          {errors.type && <div id="feedback">{errors.type}</div>}
          </div>
          
        </div>
        {errors.response && <div id="feedback">{errors.response}</div>}
      </form>
      <button className="button-dark" onClick={handleSubmit}>
        Sign in
      </button>
    </>
  );
};

const LoginFormWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "", type: "", rememberMe: false}),
  validate: values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.type){
      errors.type = "required";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  },
  handleChange: values => {
console.log(values);
  },
  handleSubmit: (values,{ props, setSubmitting }) => {
    const data = {
      email: values.email,
      password: values.password
    };
    if (values.type === 'patient'){
      UserService.signin(data)
      .then((response) => {
        setSubmitting(false);
        localStorage.setItem('id',response.data.patient._id);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('careTeamId',response.data.patient.careTeamId);
        props.redirectToVerify();
      })
      .catch((err) => {

      });
    }else {
      DoctorService.signin(data)
      .then((response) => {
        setSubmitting(false);
        localStorage.setItem('id',response.data.patient._id);
        localStorage.setItem('token',response.data.token);
      })
      .catch((err) => {});
    }
  },
  displayName: "Login Form"
})(LoginForm);


export default withRouter(Login);