import React from "react";
import { withFormik } from 'formik';
import UserService from '../../../../services/UserService';

const HealthGoals = ({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
}) => {
  return (
    <form className="health-goals">
      <div className="personal-details-header">
        <h4>Heath Goals</h4>
        <span className="edit-details" onClick={handleSubmit}>Edit</span>
      </div>
      <div className="health-goals-body">
        <span className="nav-icon health-icon"></span>
        <div className="input-box">
          <input
            type="text"
            placeholder="My health goals are..."
            className="izzy-input"
            value={values.healthGoals}
            onChange={handleChange}
            onBlur={handleBlur}
            name="healthGoals"
          />
        </div>
        {/*
        <p>
          {healthGoals}
        </p>
        */}
      </div>
    </form>
  );
};

const healtGoalsWithFormik = withFormik({
  mapPropsToValues: ({ healthGoals }) => {
    return  { healthGoals };
  },
  enableReinitialize: true,
  handleSubmit: (values) => {
    UserService.updateHealthGoals(values)
      .then(({ data }) => {
        // console.log(data);
      }).catch((err) => { console.log(err); });
  },
})(HealthGoals);

export default healtGoalsWithFormik;
