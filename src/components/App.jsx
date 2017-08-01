import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Gmap from './Gmap';
import './App.css';

const getCoords = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
    // resolve(position);
  }, reject);
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  componentDidMount() {
    getCoords()
    .then((position) => {
      this.setState({
        lat: position.lat,
        lng: position.lng,
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  render() {
    return (
      <div className="app">
        <SearchBar />
        <div className="gmap">
          {/* <Gmap {...this.state} /> */}
        </div>
      </div>
    );
  }
}

export default App;
