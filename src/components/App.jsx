import React, { Component } from 'react';
// import GmapContainer from './GmapContainer';
import Gmap from './Gmap';
import Auth from './Auth';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.getUsername = this.getUsername.bind(this);
  }

  getUsername(username) {
    this.setState({ username });
  }

  render() {
    return (
      <div className="app">
        <div className="login">
          <Auth getUsername={this.getUsername} />
        </div>
        <Gmap {...this.state} />
      </div>
    );
  }
}

export default App;
