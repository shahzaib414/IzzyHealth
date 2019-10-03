import React, { Component } from "react";
import {Link} from "react-router-dom";

import Avatar from "../../../components/avatar";
import "./index.scss";

import DetailCard from './DetailCard';
import ProfileDetails from './ProfileDetails';

import UserService from '../../../services/UserService';

class Profile extends Component {
  state = {
    email: undefined,
    additionalDetails: undefined,
    personalDetail: undefined,
    referenceCode: 'xxxxxxx',
    profileImage: undefined,
    rubies: undefined,
    doctorFake: [
      {
        _id: 1,
        name: 'Johanson Terry',
        category: 'Psicoanalist'
      },
      {
        _id: 2,
        name: 'Mary Spears',
        category: 'Nutritionist'
      },
      {
        _id: 4,
        name: 'Alejandro Perez',
        category: 'General Health'
      }
    ]
  };

  componentDidMount() {
    UserService.getProfile().then(({ data = {} }) => {
      const {
        rubies,
        email,
        personalUserInfo,
        referenceCode,
      } = data;

      const {
        personalDetail,
        additionalDetails,
        healthGoals,
        profileImage,
      } = personalUserInfo || {};

      this.setState({
        email,
        additionalDetails,
        personalDetail,
        referenceCode,
        profileImage,
        rubies,
        healthGoals,
      });
    });
  }

  updateStateName = (name) => {
    let toUpdate;
    if (!this.state.personalDetail) {
      toUpdate = {};
    } else {
      toUpdate = { ...this.state.personalDetail };
    }

    toUpdate.name = name;
    this.setState({ personalDetail: toUpdate });
  }

  render() {
    const {
      personalDetail,
      email,
      healthGoals,
      additionalDetails,
      referenceCode,
      rubies,
    } = this.state;
    return (
      <div className="profile">
        <div className="profile-header">
          <h3>Profile</h3>
          <div className="profile-header-right">
            <span className="client-no">Client Number#{referenceCode}</span>
            <Link to="/dashboard-patient/create" className="izzy-btn">
              + Create Case
            </Link>
          </div>
        </div>
        <div className="profile-name-header">
          <h3>
            <Avatar />
            {
              personalDetail && personalDetail.name
                ? personalDetail.name : email
            }
          </h3>
        </div>
        <ProfileDetails
          updateNameProfile={this.updateStateName}
          email={email}
          personalDetail={personalDetail}
          healthGoals={healthGoals}
          additionalDetails={additionalDetails}
        />
        <DetailCard rubies={rubies} doctors={this.state.doctorFake} />
      </div>
    );
  }
}

export default Profile;
