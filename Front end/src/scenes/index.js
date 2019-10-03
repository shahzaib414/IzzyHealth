import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import SignIn from './SignIn';
import SignUp from './SignUp';
import DashboardPatient from './DashboardPatient';
import VerifyEmail from './VerifyEmail';
import withAuth from './withAuth';

const Scenes = () =>
  (
    <Router>
      <Switch>
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/verify-email" component={VerifyEmail} exact />
        <Route path="/dashboard-patient" component={withAuth(DashboardPatient)} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );

export default Scenes;