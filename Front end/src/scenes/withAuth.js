import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authenticate from "../services/authenticate";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        redirect: false,
      };
    }
    componentDidMount() {
     authenticate.isAuth()
      .then((response)=> {
         if (!response.status === 200) {
          const error = new Error(response.error);
          throw error;
         }
      })
      .catch((err)=> {
        this.setState({ redirect: true });
      })
    }
    render() {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to="/sign-in" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}