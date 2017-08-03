import React, { Component } from 'react';
// import GmapContainer from './GmapContainer';
import Gmap from './Gmap';
import Auth from './Auth';

import './App.css';

// const auth = new Auth();
// auth.login();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  componentWillMount() {
    console.log('in here')
  }

  render() {
    return (
      <div className="app">
        <Gmap />
      </div>
    );
  }
}

export default App;
