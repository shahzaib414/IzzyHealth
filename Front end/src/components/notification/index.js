import React from "react";

import BellIcon from "../../images/icons/bell.png";
import "./index.scss";

export default () => {
  return (
    <div className="notification">
      <img src={BellIcon} alt="notification" />
    </div>
  );
};
