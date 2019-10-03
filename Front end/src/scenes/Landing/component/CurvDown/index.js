import React, { Component } from "react";

import "./CurvDown.scss";
import { Layout } from "antd";
const AntContent = Layout.Content;

export default class CurvDown extends Component {
  render() {
    return (
        <AntContent>
        <div className="curv-down">
        <div className="main">
          <div id="header-left">
            <h1 className="p-text-bold1">
              Buy a membership
              <br />
              for a loved one back
              <br />
              home
            </h1>
            <a className="button-dark2" href="#">
              Get in on Google Play
            </a>
            <a className="button-dark2" href="#">
              Get it on App Store
            </a>
            <a className="button-dark" href="#">
              Try a doctor for free
            </a>{" "}
            <a className="button-light" href="#">
              Learn More
            </a>{" "}
          </div>
          <div id="header-right">
            <div id="header-right-social-box">
              <div className="social-line-header"></div>
              <a href="#" className="header-social-icons">
                <i className="fab fa-twitter"></i>
              </a>{" "}
              <a href="#" className="header-social-icons">
                <i className="fab fa-facebook-f"></i>
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
      </AntContent>
    );
  }
}
