import React from "react";

import LoggedUser from "../../images/icons/avatar.png";
import "./index.scss";

export default ({ url }) => {
  return (
    <div className="avatar">
      <img src={url || LoggedUser} alt="user" />
    </div>
  );
};
