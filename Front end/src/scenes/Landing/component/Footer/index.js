import React, { Component } from "react";

import "./Footer.scss";
import { Layout } from "antd";

const AntFooter = Layout.Footer;

export default class Footer extends Component {
  render() {
    return (
        <div class="base">
          <div class="footer-base">
            <div class="main">
              <div id="footer">
                <div id="footer-left">
                  <div id="footer-logo-div">
                    {" "}
                    <img
                      src="images/logo-izzy-health.png"
                      class="footer-logo"
                      alt="IzzyAi"
                    />{" "}
                  </div>
                  <div id="language">
                    <p class="footer-text1">Language: </p>
                    <select class="lang-select">
                      <option>English</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>
                <div id="footer-right">
                  <p class="footer-title">Connect with us</p>
                  <a href="#" class="footer-social-icons">
                    <i class="fab fa-twitter"></i>
                  </a>{" "}
                  <a href="#" class="footer-social-icons">
                    <i class="fab fa-facebook-f"></i>
                  </a>{" "}
                </div>
                <div id="footer-center">
                  <p class="footer-title">Company</p>
                  <a href="#" class="footer-link">
                    About
                  </a>{" "}
                  <a href="#" class="footer-link">
                    Blog
                  </a>{" "}
                  <a href="#" class="footer-link">
                    Privacy Policy
                  </a>{" "}
                  <a href="#" class="footer-link">
                    Terms of use
                  </a>{" "}
                </div>
                <div id="footer-copyright">
                  <p class="footer-copyright">
                    Copyright &copy; 2019, Powered by Izzy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
