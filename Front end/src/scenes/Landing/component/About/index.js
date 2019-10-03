import React, { Component } from "react";

import "./About.scss";

import { Layout } from "antd";
const AntContent = Layout.Content;

export default class About extends Component {
  render() {
    return (
      <AntContent>
        <div className="base">
          <div className="about-base">
            <div className="main">
              <p className="heading">About the App</p>
              <div className="about-left"></div>
              <div className="about-right">
                <p className="sub-heading">
                  Unlimited Consultations
                  <br />
                  with your care team
                </p>
                <p className="p-about">
                  A licensed psychotherapist
                  <br />
                  , and nutrition &amp; wellness coach
                  <br />
                  via encrypted, HIPPA complaint
                  <br />
                  messaging and video.
                </p>
                <div className="btn">
                  <a className="button-light-about" href="#">
                    Learn More
                  </a>
                </div>{" "}
              </div>
            </div>
          </div>

          <div className="about-base">
            <div className="main">
              <div className="about-left2">
                <p className="check">
                  <i className="fas fa-check-circle"></i>
                </p>
                <p className="sub-heading2">
                  IZZY tokens on meeting
                  <br />
                  your own personal
                  <br />
                  health goals.
                </p>
                <p className="p-about2">
                  Think of this as earning a cryptocurrency
                  <br />
                  like Bitcoin simply time &amp; energy into
                  <br />
                  your own personal health &amp; wellness.
                </p>
                <div className="btn">
                  <a className="button-light-about2" href="#">
                    Get Started
                  </a>
                </div>{" "}
              </div>
              <div className="about-right2"> </div>
            </div>
          </div>
        </div>
      </AntContent>
    );
  }
}
