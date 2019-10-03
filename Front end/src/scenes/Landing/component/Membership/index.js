import React, { Component } from "react";

import "./Membership.scss";
import { Layout } from "antd";

const AntContent = Layout.Content;

export default class Membership extends Component {
  render() {
    return (
      <AntContent>
        <div className="base">
          <div className="header-base">
            <div className="curv-up">
              <div className="stars">
                <div className="main">
                  <div className="premium-left"></div>
                  <div className="premium-right">
                    <p className="sub-heading-premium">
                      Enjoy free premium for 30 days
                    </p>
                    <p className="p-premium">
                      Everything you need, from getting in contact
                      <br />
                      with your care team to viewing health records
                      <br />
                      is rigth at your fingertips in the Izzy Health.
                    </p>
                    <div className="btn">
                      <a href="#" className="button-light-premium">
                        Get promotion
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="base">
          <div className="plans-base">
            <div className="main">
              <div className="stars">
                <p className="big_heading">
                  Your personal and
                  <br />
                  dedicated care team
                </p>
                <p className="small_heading">
                  Access to our care teams
                  <br />
                  on the go and from anywhere
                </p>
                <div id="plan_duration_box">
                  <p className="monthly">Monthly</p>
                  <p className="anually">6 Months</p>
                  <div className="radiosd">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="change"
                        name="billing"
                        value="Annually"
                        id="box"
                        onClick="chk_btn()"
                      />
                      <span className="slider round"></span>{" "}
                    </label>
                  </div>
                </div>
                <div className="plans-left">
                  <p className="plans-heading-left">FREE</p>
                  <p className="p-plans-left">
                    1 message per month <br />
                    with a care team member
                  </p>
                  <p className="p-plans-left">Personalized Care</p>
                  <p className="p-plans-left">Preventive Care</p>
                  <p className="p-plans-left-disabled">File Sharing</p>
                  <p className="p-plans-left-disabled">
                    Colloboration
                    <br />
                    between doctors
                  </p>
                  <p className="p-plans-left-disabled">Video</p>
                  <p className="p-plans-left-disabled">Voice Calls</p>
                  <div className="btn">
                    <a href="#" className="button-dark-plans">
                      Get Promotion
                    </a>
                  </div>
                </div>
                <div className="plans-right">
                  <p className="plans-heading-right">PREMIUM</p>
                  <p className="p-plans-right">
                    1 message per month <br />
                    with a care team member
                  </p>
                  <p className="p-plans-right">Personalized Care</p>
                  <p className="p-plans-right">Preventive Care</p>
                  <p className="p-plans-right">File Sharing</p>
                  <p className="p-plans-right">
                    Colloboration
                    <br />
                    between doctors
                  </p>
                  <p className="p-plans-right">Video</p>
                  <p className="p-plans-right">Voice Calls</p>
                  <div className="btn">
                    <a href="#" className="button-light-plans">
                      Get Promotion
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AntContent>
    );
  }
}
