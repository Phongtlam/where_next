import React, { Component } from 'react';
// import GmapContainer from './GmapContainer';
import Gmap from './Gmap';
import Auth from './Auth';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <div className="login">
          <Auth />
        </div>
        <Gmap />
      </div>
    );
  }
}

export default App;
