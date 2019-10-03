import React, { Component } from 'react';
import Scenes from './scenes';
import Toolkit from './services/Toolkit';
import './App.css';

class App extends Component {
  componentDidMount() {
    document.addEventListener('httpError', (e) => {
      // console.log('http error event');
      Toolkit.showNotification('error', 'Error', e.detail);
    });
    document.addEventListener('httpSuccess', e => Toolkit.showNotification('success', 'Info', e.detail));
    document.addEventListener('apiOffline', e => Toolkit.showNotification('info', 'API desconected', e.detail));
    document.addEventListener('httpInfo', e => Toolkit.showNotification('info', 'Info', e.detail));
    document.addEventListener('tokenError', () => {
      if (localStorage.token) {
        delete localStorage.token;
        Toolkit.showNotification('error', 'Session expired', 'Please sign in again to continue');
      }
    });
  }

  render() {
    return (
      <Scenes />
    );
  }
}

export default App;
