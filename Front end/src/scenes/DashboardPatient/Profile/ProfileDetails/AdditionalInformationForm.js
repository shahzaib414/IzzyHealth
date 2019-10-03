import React from "react";
import { withFormik } from 'formik';
import UserService from '../../../../services/UserService';

const AdditionalInformationForm = ({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
}) => {
  return (
    <form className="additional-details">
      <div className="personal-details-header">
        <h4>Additional Information</h4>
        <span className="edit-details" onClick={handleSubmit}>Edit</span>
      </div>
      <div className="additional-details-body">
        <div className="input-box">
          <input
            type="text"
            placeholder="Type of blod"
            className="izzy-input"
            value={values.typeOfBlod}
            onChange={handleChange}
            onBlur={handleBlur}
            name="typeOfBlod"
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Allergies"
            className="izzy-input"
            value={values.allergies}
            onChange={handleChange}
            onBlur={handleBlur}
            name="allergies"
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Diet"
            className="izzy-input"
            value={values.diet}
            onChange={handleChange}
            onBlur={handleBlur}
            name="diet"
          />
        </div>
      </div>
    </form>
  );
};

const additionalInfoWithFormik = withFormik({
  mapPropsToValues: ({ diet, typeOfBlod, allergies }) => {
    return { diet, typeOfBlod, allergies };
  },
  enableReinitialize: true,
  handleSubmit: (values) => {
    UserService.updateAdditionalDetails(values)
      .then(({ data }) => {
        // console.log(data);
      });
  },
})(AdditionalInformationForm);

export default additionalInfoWithFormik;
