import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { message } from "antd";
import classnames from "classnames";

import Modal from "../../../../components/modal";
import Dropdown from "../../../../components/dropdown";
import SearchBar from "../../../../components/searchbar";
import Avatar from "../../../../components/avatar";
import Context from "../../../../Context";
import UserService from "../../../../services/UserService";

import "./index.scss";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      prescriptionList:[],
      cases: [],
      doctors: [],
      selected: "",
      careteamId: localStorage.getItem("careTeamId")
    };
    this.HandleSearch = this.HandleSearch.bind(this);
    this.OnPressEnter = this.OnPressEnter.bind(this);
  }

  componentDidMount() {
    this.getCaseList();
    this.getPrescription();

    console.log('Loading Doctor API...');

    UserService.getCareTeamDoctors({
      careTeamId: localStorage.getItem("careTeamId")
    })
      .then(res => {
        console.log('Doctors Loaded Successfully');
        this.setState({
          doctors: res.data,
          selected: res.data[0].category,
          doctorId: res.data[0]._id
        })

      })
      .catch(err => {
        console.log(`Doctors failed to Load:${err}`);
        //message.error(err.message);
      });
  }

  getCaseList() {
    console.log('Loading Case list...');
    UserService.getCaseList({})
      .then(res => {
        console.log('Cases Loaded Successfully');
        this.setState({
          cases: res.data
        });
      })
      .catch(err => {
        console.log(`Cases failed to Load:${err}`);
        //message.error(err.message);
      });
  }
  getPrescription() {
    console.log('Loading prescription List');
    UserService.getPrescription()
    .then(res => {
        console.log(res)
        this.setState({
          prescriptionList: res.data
        })
    })
    .catch(err => {
      console.log(`Prescription API faild ${err}`)
    })
  }
  CaseTypeColor(value) {
    switch (value) {
      case "Mild":
        return "case-level green";
      case "Moderate":
        return "case-level yellow";
      case "Severe":
        return "case-level red";

      default:
        return "case-level red";
    }
  }
  OnNotificationClick (event) {
    console.log(`${event}`)
  }
  HandleSearch(event) {
    event.preventDefault();
    this.setState({ searchValue: event.target.value });
  }
  OnPressEnter(event) {
    if (event.key === "Enter") {
      if (this.state.searchValue !== "") {
        UserService.searchCaseByQuery({
          searchQuery: this.state.searchValue
        })
          .then(res => {
            this.setState({ cases: res.data });
          })
          .catch(err => {
            message.error(err.message);
          });
      }
      else {
        this.getCaseList();
      }
    }
  }
  render() {
    const users = this.state.doctors.map((value, index) => (
      <div
        onClick={() => {
          this.setState({ selected: value.category, doctorId: value._id });
        }}
        className={classnames(
          {
            active: this.state.selected === value.category
          },
          "doctor-avatar"
        )}
      >
        <Avatar url={value.personalUserInfo.profileImage} />
      </div>
    ));
    const tabs = this.state.doctors.map((value, index) => (
      <li
        onClick={() =>
          this.setState({ selected: value.category, doctorId: value._id })
        }
        className={classnames({
          active: this.state.selected === value.category
        })}
      >
        {value.category}
      </li>
    ));

    return (
      <div className="history">
        <div className="history-header">
          <h3>Clinical History</h3>
          <div className="history-header-right">
            <div className="user-list">{users}</div>
            <Link
              to={{
                pathname: "/dashboard-patient/create",
                state: {
                  doctorId: this.state.doctorId
                }
              }}
              className="izzy-btn"
            >
              + <span>Create Case</span>
            </Link>
          </div>
        </div>
        <div className="history-body">
        <div className="history-table">
            <div className="history-table-tabs">
              <ul>{tabs}</ul>
            </div>
            <div className="status-filter">
            <div className="date-filter-box">
                <span>From:</span>
                <label className="date-filter">
                  <input type="date" />
                </label>
              </div>
              <div className="date-filter-box">
                <span>To:</span>
                <label className="date-filter">
                  <input type="date" />
                </label>
              </div>
              <div className="status-dropdown">
                <Dropdown
                  header={props => <FilterHeader {...props} />}
                  options={["All", "close", "open"]}
                />
              </div>
              <div className="filter-search">
                <SearchBar
                  HandleSearch={this.HandleSearch}
                  OnPressEnter={this.OnPressEnter}
                  placeholder="Search your case..."
                />
              </div>
            </div>
            <div className="history-table-section">
              <div className="history-table-head">
                <div>Date Attention</div>
                <div>Subject Case</div>
                <div>Level</div>
                <div>Status</div>
              </div>
              {this.state.cases.map((value, index) => {
                return (
                  <div
                    className={
                      value.openClose === "close"
                        ? "history-item"
                        : "history-item active"
                    }
                  >
                    <div className="case-number">
                      <Link to="/create">
                        <span className="nav-icon date-icon" />{" "}
                        <Moment format="DD/MM/YYYY">{value.dateOfCase}</Moment>
                      </Link>
                    </div>
                    <div className="case-subject">{value.subject}</div>
                    <div className={this.CaseTypeColor(value.caseType)}>
                      {value.caseType}
                    </div>
                    <div className="case-status">
                      {value.openClose}{" "}
                      <span
                        className={
                          value.openClose === "close"
                            ? "status-dot"
                            : "status-dot open"
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="history-cards">
          <NotificationCard OnNotificationClick={this.OnNotificationClick} notifications={this.context.notifications}  />
          <PrescriptionCard prescriptionList={this.state.prescriptionList} />
          </div>
        </div>
      </div>
    );
  }
}

History.contextType = Context;

export default History;

const FilterHeader = ({ value }) => (
  <div className="status-filter-header">
    <span className="status-text">Status</span>
    <span className="status-dot"></span>
    <span className="status-value">{value}</span>
  </div>
);

class NotificationCard extends React.Component {
  constructor(props){
    super(props)
  }

    render() {
      const notifications = this.props.notifications.map((value, index) => (
        <li onClick={this.props.OnNotificationClick} key={index}>{value.title}</li>
      ));
      return (
        <div className="notification-card">
          <div className="notification-card-head">
            <h4>Notification</h4>
            <p>You have {this.props.notifications.length} Notification:</p>
            <span className="nav-icon card-menu-icon" />
          </div>
          <ul>{notifications}</ul>
        </div>
      );
    }
}

class PrescriptionCard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const prescription = this.props.prescriptionList.map((e, i) => <Prescription key={i} {...e} /> );

  return (
    <div className="prescription-card">
      <div className="prescription-card-head">
        <h4>Prescriptions</h4>
        <span className="nav-icon card-menu-icon" />
      </div>
      <div>{prescription}</div>
    </div>
  );
  }
};
class Prescription extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      prescriptionDetail:  {}
    }
  }
  state = {
    openModal: false
  }
  componentDidMount() {
    UserService.getPrescriptionModal({
      id: this.props._id
    })
    .then(res => {
      this.setState({
        doctorName: res.data.doctor.name,
        prescriptionTitle: res.data.prescription.title,
        prescription: res.data.prescription.prescription,
        date: res.data.prescription.date,
        caseDescription: res.data.case.description,

      })
    })
  }
  toggle(e){
    e.stopPropagation();
    this.setState({ openModal: !this.state.openModal })
  }
  OnClickHandler() {

  }
  render(){
    const { title, createdDate, prescription, doctorId } = this.props;
    return(
    <div className="medication" onClick={() => this.setState({ openModal: true }) }>
      <Modal
        show={this.state.openModal}
        toggle={e => this.toggle(e) }
      >
        <div className="modal-header">          
          <h3>{title}</h3>
        </div>
        <div className="modal-body">
          <h2>doctor: <p>{this.state.doctorName}</p> </h2>
          <h2> Case  Details </h2>
          <p> description:{this.state.caseDescription}  </p>
          <p> {this.state.prescription}  </p>
        </div>
      </Modal>
      <span className="nav-icon arrow-icon" />
      <h5>{title}</h5>
      <div className="medication-date">
        <Moment className="nav-icon med-date-icon"  format="DD/MM/YYYY">{createdDate}</Moment>&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="medication-days">{prescription}</span>
      </div>
    </div>
    )
  }
}
