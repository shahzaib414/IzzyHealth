import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import './VerifyEmail.css';


class VerifyEmail extends Component {
  goToMain = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div class="main">
        <div id="header-left">
          <div id="logo"><img src="../../images/mail-logo.png" class="logo" alt="IZZY Health"/></div>
            <p class="p-text-bold1">iWelcome!</p>
            <p class="p-text-normal">Thanks for signing up!<br />We just need you to verify<br />your email address to complete <br />setting up your account.</p>
            <div class="btn">
              <button onClick={this.goToMain} class="button-dark">Verify My Email</button>
            </div>
          </div>
        <div id="header-right"></div>
      </div>
    )
  }
}

export default withRouter(VerifyEmail);
