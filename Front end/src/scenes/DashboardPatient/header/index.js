import React from 'react';
import { Link } from "react-router-dom";
import classnames from "classnames";

import SearchBar from "./searchbar";
import Avatar from "../../../components/avatar/";
import Notification from "../../../components/notification";

import WhiteLogo from "../../../images/white-logo.png";
import "./index.scss";
export default class Header extends React.Component {

  state = {
    dropSearch: false
  }

  render(){
    return (
      <div className="header-wrapper">
        <header
          id="header"
          className={classnames(
            { "drop-search": this.state.dropSearch },
          )}
        >
          <div className="header-left">
            <Link to="/dashboard-patient" className="logo">
              <img src={WhiteLogo} alt="logo" />
            </Link>
          </div>
          <div className="header-right">
            <SearchBar placeholder="Search doctors" />
            <Link to="/sign-up">
              <Avatar />
            </Link>
            <Notification />
          </div>
          <span
            className="nav-icon menu-icon"
            onClick={() =>
              this.setState({ dropSearch: !this.state.dropSearch })
            }
          />
        </header>
      </div>
    );
  }
};
