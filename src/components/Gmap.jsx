import React from 'react';
import GoogleMapReact from 'google-map-react';

class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: {
        lat: 0,
        lng: 0,
      },
    };
  }

  render() {
    const center = {
      lat: this.props.lat,
      lng: this.props.lng,
    };
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          // key: 'AIzaSyD1luAT63jgddurdrZFW_Ba9_jRKo7GkP0',
        }}
        defaultCenter={this.state.defaultCenter}
        center={center}
        defaultZoom={17}
      >
        {/* <Popup
          lat={center.lat}
          lng={center.lng}
        /> */}
      </GoogleMapReact>
    );
  }
}

export default Gmap;
