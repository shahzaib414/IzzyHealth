import React from "react";
import { Link } from "react-router-dom";

import Steps from "./steps";
import * as yup from "yup";
import { message } from "antd";
import UserService from "../../../../services/UserService";

import "./index.scss";

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateError: null,
      description: null,
      problemLevel: "Mild",
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
  }

  handleDateChange(event) {
    event.preventDefault();
    this.setState({
      date: event.target.value,
      dateError: null,
    });
  }
  handleDescription(event) {
    event.preventDefault();
    this.setState({
      description: event.target.value
    });
  }
  handleSubject(event) {
    event.preventDefault();
    this.setState({
      subject: event.target.value
    })
  }
  changeProblemLevel = (problemLevel) => {
    this.setState({ problemLevel });
  }

  handleSubmit() {
    const {doctorId} =this.props.location.state
    let schema = yup.object().shape({
      date: yup.date().required(),
      description: yup.string().required(),
      subject: yup.string().required(),

    });
    schema
      .validate({
        date: this.state.date,
        description: this.state.description,
        subject: this.state.subject
      })
      .then(valid => {
        if (valid) {
          this.setState({ dateError: null });
          UserService.createCase({
            patientId: localStorage.getItem("id"),
            caseTypeId: this.state.problemLevel,
            subject: this.state.subject,
            doctorId: doctorId,
            cliente: 11,
            date: this.state.date,
            description: this.state.description
          })
            .then(() => {
              message.success('Successfully Created')
              this.props.history.push("/dashboard-patient");
            })
            .catch(err => {
              message.error(err.message);
            });
        }
      })
      .catch(err => {
        if (err.path === "description") {
          this.setState({ descriptionError: "Date is required" });
        }
        if (err.path === "date") {
          this.setState({ dateError: "Description is required" });
        }
        if (err.path === "subject") {
          this.setState({ subjectError: "Subject is required" });
        }

      });
  }
  render() {
    return (
      <div className="create-case">
        <div className="create-case-header">
          <h2>
            <span className="nav-icon folder-icon"></span>Create your Case
          </h2>
          <Link className="izzy-btn" onClick={this.handleSubmit}>
            + Create Case
          </Link>
        </div>
        <Steps
          changeProblemLevel={this.changeProblemLevel}
          dateError={this.state.dateError}
          handleDateChange={this.handleDateChange}
          handleDescription={this.handleDescription}
          problemMild={this.problemMild}
          problemModerate={this.problemModerate}
          problemSeveral={this.problemSeveral}
          handleSubject={this.handleSubject}
        />
      </div>
    );
  }
}
