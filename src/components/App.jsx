import React, { Component } from 'react';
// import GmapContainer from './GmapContainer';
import Gmap from './Gmap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  render() {
    return (
      <div className="app">
        {/* <SearchBar /> */}
        <div className="gmap">
          {/* <GmapContainer {...this.state} /> */}
        </div>
        <Gmap />
      </div>
    );
  }
}

export default App;
