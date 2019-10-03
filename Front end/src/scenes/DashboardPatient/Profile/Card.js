import React from "react";

import Avatar from "../../../components/avatar";
import "./index.scss";

const Card = ({ name = '', category = '' }) => (
  <div className="team-card">
    <div className="team-card-inner">
      <Avatar />
      <h4>{name}</h4>
      <p>{category}</p>
    </div>
  </div>
);

export default Card;
