import React from "react";

import AdditionalInformationForm from './AdditionalInformationForm';
import HealthGoals from './HealthGoals';
import Details from './Details';

const ProfileDetails = ({
  email,
  additionalDetails = {},
  personalDetail = {},
  healthGoals,
  updateNameProfile,
}) => {
  const { diet, typeOfBlod, allergies } = additionalDetails;
  return (
    <div className="profile-details">
      <Details
        updateNameProfile={updateNameProfile}
        email={email}
        name={personalDetail.name}
        sex={personalDetail.sex}
        address={personalDetail.address}
        phone={personalDetail.phone}
        weight={personalDetail.weight}
        height={personalDetail.height}
      />
      <AdditionalInformationForm diet={diet} allergies={allergies} typeOfBlod={typeOfBlod} />
      <HealthGoals healthGoals={healthGoals} />
    </div>
  );
};

export default ProfileDetails;
