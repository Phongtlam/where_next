import React from 'react';
import InitMap from './InitMap';

const getCoords = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
    // resolve(position);
  }, reject);
});


class GmapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      currentPos: {
        lat: null,
        lng: null,
      },
    };
    this.textSearch = this.textSearch.bind(this);
  }

  componentDidMount() {
    getCoords()
    .then((position) => {
      const newMarker = {
        position: {
          lat: position.lat,
          lng: position.lng,
        },
      };
      this.setState(prevState => ({
        markers: prevState.markers.concat(newMarker),
        currentPos: { lat: position.lat, lng: position.lng },
      }));
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  textSearch() {

  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <InitMap
          {...this.state}
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          markers={this.state.markers}
        />
      </div>
    );
  }
}

export default GmapContainer;
