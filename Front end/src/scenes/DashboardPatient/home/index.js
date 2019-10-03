import React from 'react';

import FirstCase from "./firstcase";
import History from "./history/index"
import Context from "../../../Context"
import UserService from "../../../services/UserService";

export default class Home extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      caseExist: false
    }
  }
  componentDidMount() {
    UserService.getCaseList({})
    .then((res) => {
      console.log(`Case List ${res.data}`)
      if(res.data){
        this.setState({
          caseExist: true
        })
      }
    })
  }
  render(){
    if (this.state.caseExist) {
      return (<FirstCase />)
   } else {
     return <History />
   }
  }
}