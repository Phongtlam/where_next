import React, { Component } from 'react';
// import GmapContainer from './GmapContainer';
import Gmap from './Gmap';
import Auth from './Auth';

import './App.css';

const auth = new Auth();
// auth.login();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  // login() {
  //   this.props.auth.login();
  // }
  //
  onLogout() {
    auth.logout();
  }

  componentWillMount() {
    console.log('in here')
  }

  onLogin() {
    auth.login()
  }

  render() {
    const { isAuthenticated } = auth;
    return (
      <div className="app">
        <Gmap />
        {
              !auth.isAuthenticated() && (
                  <button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.onLogin.bind(this)}
                  >
                    Log In!
                  </button>
                )
            }
            {
              auth.isAuthenticated() && (
                  <button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.onLogout.bind(this)}
                  >
                    Log Out
                  </button>
                )
            }
        {/* <button onClick={this.onLogin}>CLICK</button> */}
      </div>
    );
  }
}

export default App;
