import React from 'react';
import { Link } from "react-router-dom";
import classnames from "classnames";
import Avatar from "../../../components/avatar";
import FirstCaseImg from "../../../images/first-case.jpg";
import "./firstcase.scss";

import UserService from "../../../services/UserService";
const DoctorTypes = ["General Health", "Nutrition", "Mental Health"];

export default () => (
  <div className="first-case">
    <div className="first-case-header">
    <DoctorsGroup />
    </div>
    <div className="first-case-inner">
      <div className="caption">
        <h2>Create Your <br /> First Case!</h2>
        <p>
          Describe your case the best of your abilities and your care team will
          respond.
        </p>
        <Link to="/dashboard-patient/create" className="izzy-btn">
          + New Case
        </Link>
      </div>
      <div className="thumb">
        <img src={FirstCaseImg} alt="First Case" />
      </div>
    </div>
  </div>
);

class DoctorsGroup extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        selected: "",
        doctors: [],
      };
  }
  componentDidMount() {
    UserService.getCareTeamDoctors({
      careTeamId: localStorage.getItem("careTeamId")
    })
      .then(res => {
        console.log('Doctors Loaded Successfully');
        this.setState({
          doctors: res.data,
          selected: res.data[0].category,
          doctorId: res.data[0]._id
        })

      })
      .catch(err => {
        console.log(`Doctors failed to Load:${err}`);
        //message.error(err.message);
      });
  }
  render() {
    const users = this.state.doctors.map((value, index) => (
      <div
        onClick={() => this.setState({ selected: value.category, doctorId: value._id })}
        className={classnames(
          {
            active: this.state.selected === value.category
          },
          "doctor-avatar"
        )}
      >
        <Avatar url={value.personalUserInfo.profileImage} />
      </div>
    ));
    const tabs = this.state.doctors.map((value, index) => (
      <li
        onClick={() => this.setState({ selected: value.category, doctorId: value._id  })}
        className={classnames({
          active: this.state.selected === value.category
        })}
      >
        {value.category}
      </li>
    ));

    return (
      <React.Fragment>
        <div className="first-case-header-top">
          <div className="user-list">{users}</div>
          <Link to="/create" className="izzy-btn">
            + New Case
          </Link>
        </div>
        <div className="first-case-tabs">
          <ul>{tabs}</ul>
        </div>
      </React.Fragment>
    );
  }
}

