import React from "react";
import { NavLink } from "react-router-dom";

import "./index.scss";


export default () => {
  return (
    <aside id="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink exact to="/dashboard-patient" activeClassName="active">
              <span className="nav-icon home-icon" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard-patient/profile" activeClassName="active">
              <span className="nav-icon user-icon" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard-patient/chat" activeClassName="active">
              <span className="nav-icon chat-icon" />
            </NavLink>
          </li>
          <li>
            <NavLink to="dashboard-patient/setting" activeClassName="active">
              <span className="nav-icon cog-icon" />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="account-btn">
        <span className="nav-icon power-icon" />
      </div>
    </aside>
  );
}
