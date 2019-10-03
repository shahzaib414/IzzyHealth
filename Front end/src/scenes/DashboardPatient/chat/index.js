import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Dropdown from '../../../components/dropdown';
import SearchBar from '../../../components/searchbar';
import Avatar from '../../../components/avatar';
import UserService from '../../../services/UserService';
import { Badge } from 'antd';

import './Chat.scss';

class Chat extends Component {
  state = {
    conversations: [],
    users: [...Array(3)].map(() => <Avatar />),
    caseCount: 0,
  };

  searchConversations = (searchTerm) => {
    console.log('Search conversation', searchTerm);
  };

  componentDidMount() {
    UserService.getConversationList()
      .then(({ data }) => {
        this.setState({ conversations: data });
      });

    UserService.getCaseCount()
      .then(({ data }) => {
        this.setState({ caseCount: data.count });
      });
  }

  isNotification = ({ patientId, doctorId, seen } = {}) => {
    const id = localStorage.getItem('id');
    if (!id) { return 0; }

    if (!patientId && !doctorId) {
      return 0;
    }

    if (id === patientId) {
      if (doctorId && !seen) { return 1; }

      return 0;
    } else if (id === doctorId) {
      if (patientId && !seen) { return 1; }

      return 0;
    } else {
      return 0;
    }
  }

  render() {
    const { users, conversations, caseCount } = this.state;
    return (
      <div className="chat-list">
        <div className="chat-list-header">
          <h3>Chat Patients</h3>
          <div className="chat-list-header-right">
            <span className="no-cases">{caseCount} cases</span>
            <div className="user-list">{users}</div>
          </div>
        </div>
        <div className="case-heading">Cases Patients</div>
        <div className="status-filter">
          <div className="status-dropdown">
            <Dropdown
              header={props => <FilterHeader {...props} />} 
              options={[ "All", "Offline", "Online", "Busy" ]}
            />
          </div>
          <div className="filter-search">
            <SearchBar action={this.searchConversations} placeholder="Search your case..." />
          </div>
        </div>
        <div className="chat-list-body">
          {
            conversations.map((conversation) => (
              <Link to="/chat" className="list-item" key={conversation.conversationId}>
                <div className="list-item-content">
                  <Badge count={this.isNotification(conversation.lastMessage)} dot>
                    <Avatar url={conversation.doctor.personalUserInfo && conversation.doctor.personalUserInfo.profileImage} />
                  </Badge>
                  <div className="list-item-title">
                    <h4>{conversation.doctor.name || conversation.doctor.email}</h4>
                    <p>{
                      conversation.lastMessage && conversation.lastMessage.body
                        ? conversation.lastMessage.body : 'No message in this conversation'
                    }</p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    );
  };
};

const FilterHeader = ({ value }) => (
  <div className="status-filter-header">
    <span className="status-text">Status</span>
    <span className="status-dot"></span>
    <span className="status-value">{value}</span>
  </div>
);

export default Chat;
