import React from "react";

import "./index.scss";

import Card from './Card';

const DetailCard = ({ rubies = 0, doctors = [] }) => {
  return (
    <div className="profile-cards">
        <div className="rubies-card">
          <h4>Rubies</h4>
          <div className="rubies-card-body">
            <span className="nav-icon menu-icon" />
            <div>
              Your Current Rubies
              <span className="count">{Number(rubies).toFixed(2)}</span>
              <span className="amount">+ ${Number(rubies + (rubies * 15/100)).toFixed(2)} <small>15%</small></span>              
            </div>
            <button className="izzy-btn">BUY</button>
          </div>
        </div>
        <div className="care-team-cards">
          <h4>Care Team</h4>
          <div className="care-team-cards-body">
            {doctors
              .map((doctor) => <Card key={doctor._id} name={doctor.name} category={doctor.category}/>)}
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
