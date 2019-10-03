import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./home";
import Create from "./home/create";
import Chat from "./chat";
import UserService from "../../services/UserService";

import Header from "./header";
import Sidebar from "./sidebar/index";
import Profile from './Profile';
import "./index.scss";
import Conetxt from "../../Context";

export const DashboardContext = React.createContext({});
export default class DashboardPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationList: []
    };
  }
  componentDidMount() {
    UserService.getNotifications({
      seen: false
    })
      .then(response => {
        //console.log(response);
        this.setState({
          notificationList: response.data
        });
      })
      .catch(error => {});
  }
  render() {
    return (
      <div className="dashboard">
        <Header />
        <Sidebar />
        <main className="dashboard-main">
          <Switch>
          <Route exact path="/dashboard-patient/profile" component={Home} />
            <Route path="/dashboard-patient/chat" component={Chat} />
            <Route path="/dashboard-patient/setting" component={Home} />
            <Route path="/dashboard-patient/create" component={Create} />
            <Route exact path="/dashboard-patient">
            <Conetxt.Provider value={{
                notifications: this.state.notificationList,
              }}>
                <Home />
              </Conetxt.Provider>
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}
