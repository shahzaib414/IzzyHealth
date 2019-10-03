import React, { Component } from "react";

import "./Header.scss";
import { Layout } from "antd";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
        <div className="base">
          <div className="header-base">
          <div className="main">
            <div id="navication-base">
            <div id="logo"><img src="images/logo-izzy-health.png" className="logo" alt="IZZY-Health"/></div>
              <div id="navigation"></div>
              <div className="dropdown">
                <button className="dropbtn">
                  <i className="fas fa-bars"></i>
                </button>
                <div className="dropdown-content">
                  <a href="#">HOME</a>
                  <a href="#">ABOUT</a>
                  <a href="#">MEMBERSHIP</a>
                  <a href="#">TEAM</a>
                  <Link to="/sign-in">SIGN IN</Link>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}
