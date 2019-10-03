import React, { Component } from "react";

import Header from "./component/Header";
import CurvDown from "./component/CurvDown";
import About from "./component/About";
import Membership from "./component/Membership";
import Careteam from "./component/Careteam";
import Footer from "./component/Footer";

import "./Landing.css";

class Landing extends Component {
  render() {
    return [<Header />, <CurvDown />, <About />, <Membership />, <Careteam />, <Footer/>];
  }
}

export default Landing;
