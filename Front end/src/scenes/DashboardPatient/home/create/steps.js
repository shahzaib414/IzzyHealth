import React from "react";

import "./steps.scss";
import UserService from "../../../../services/UserService";

export default class Steps extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="case-steps">
        <InfoStep handleDateChange={this.props.handleDateChange} dateError={this.props.dateError} />
        <ProblemStep
          changeProblemLevel={this.props.changeProblemLevel}
        />
        <DescriptionStep handleDescription={this.props.handleDescription} handleSubject={this.props.handleSubject} />
      </div>
    );
  }
}

class InfoStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = { caseCount: 0 }; 
  }
  componentDidMount(){
    UserService.getCaseCount()
    .then((res) => {
      console.log(res.data.count)
      this.setState({caseCount: res.data.count+1})
    })
    .catch((err)=> {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="case-step">
        <div className="case-step-header">
          <h4>Patient Information</h4>
        </div>
        <div className="case-step-body">
          <div className="info-body">
            <div>
              <p>Date of the Case</p>
              <label className="date-type">
                <input
                  type="date"
                  required
                  className={
                    this.props.dateError ? 'izzy-input-required' : 'izzy-input'
                  }
                  onChange={this.props.handleDateChange}
                  name="date"
                />
              </label>
            </div>
            <div>
              <p>Number of Client</p>
              <span className="client-no">{this.state.caseCount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ProblemStep extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="case-step">
        <div className="case-step-header">
          <h4>Problem Level</h4>
        </div>
        <div className="case-step-body">
          <div className="level-btns">
            <label className="styled-step-input">
              <input type="radio" name="problemLevel" onChange={() => this.props.changeProblemLevel('Mild')} />
              <div className="izzy-btn green">Level Mild</div>
            </label>
            <label className="styled-step-input">
              <input type="radio" name="problemLevel" onChange={() => this.props.changeProblemLevel('Moderate')} />
              <div className="izzy-btn yellow">Level Moderate</div>
            </label>
            <label className="styled-step-input">
              <input type="radio" name="problemLevel" onChange={() => this.props.changeProblemLevel('Several')}/>
              <div className="izzy-btn red">Level Several</div>
            </label>
          </div>
        </div>
      </div>
    )
  }
}
class DescriptionStep extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="case-step">
        <div className="case-step-header">
          <h4>Problem Description</h4>
        </div>
        <div className="case-step-body">
          <form>
          <input
          name="subject"
          type="text"
          placeholder="Subject"
          className={
            this.props.subjectError ? 'izzy-input-required' : 'izzy-input'
          }
          onChange={this.props.handleSubject}
          required
        />
            <textarea
            className={
              this.props.dateError ? 'izzy-input-required' : 'izzy-input'
            }
              onChange={this.props.handleDescription}
              name="description"
              placeholder="Describe waht you feel..."
            />
          </form>
        </div>
      </div>
    );
  }
}
