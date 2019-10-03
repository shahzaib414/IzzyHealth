import React, { Component } from "react";

import "./Careteam.scss";
import { Layout } from "antd";

const AntContent = Layout.Content;

export default class Careteam extends Component {
  render() {
    return (
      <AntContent>
        <div className="base">
          <div className="curv-down2"></div>
          <div className="team-base">
            <div className="main">
              <p className="care-heading">Care team</p>
              <div id="care">
                <div className="care-team-box">
                  <div className="care-team-image-box">
                    {" "}
                    <img
                      src="images/doc1.jpg"
                      className="care-team-image"
                      alt="Dr. Karthik"
                    />{" "}
                  </div>
                  <p className="care-title">Dr. Karthik</p>
                  <p className="care-deails">General Physician</p>
                </div>
                <div className="care-team-box">
                  <div className="care-team-image-box">
                    {" "}
                    <img
                      src="images/doc2.jpg"
                      className="care-team-image"
                      alt="Ms. Awosanya"
                    />{" "}
                  </div>
                  <p className="care-title">Ms. Awosanya</p>
                  <p className="care-deails">Nutritionist</p>
                </div>
                <div className="care-team-box">
                  <div className="care-team-image-box">
                    {" "}
                    <img
                      src="images/doc3.jpg"
                      className="care-team-image"
                      alt="Ms. Funmilayo"
                    />{" "}
                  </div>
                  <p className="care-title">Ms. Funmilayo</p>
                  <p className="care-deails">Psychologist</p>
                </div>
                <div className="care-team-box">
                  <div className="care-team-image-box">
                    {" "}
                    <img
                      src="images/doc4.jpg"
                      className="care-team-image"
                      alt="Dr. Campos "
                    />{" "}
                  </div>
                  <p className="care-title">Dr. Campos </p>
                  <p className="care-deails">General Physician</p>
                </div>
                <div className="care-team-box">
                  <div className="care-team-image-box">
                    {" "}
                    <img
                      src="images/doc5.jpg"
                      className="care-team-image"
                      alt="Dr. Lopez"
                    />{" "}
                  </div>
                  <p className="care-title">Dr. Lopez</p>
                  <p className="care-deails">Nutritionist</p>
                </div>
                <div className="care-team-box">
                  <div className="care-team-image-box">
                    {" "}
                    <img
                      src="images/doc6.jpg"
                      className="care-team-image"
                      alt="Dr. Wulliam Moreno"
                    />{" "}
                  </div>
                  <p className="care-title">Dr. Moreno</p>
                  <p className="care-deails">Psychologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AntContent>
    );
  }
}
