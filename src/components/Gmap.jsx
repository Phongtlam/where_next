import React from 'react';
import GoogleMapReact from 'google-map-react';

import pin from './pin.png';

const Popup = () => (
  <div>
    <img
      // style={styles.marker}
      src={pin}
      alt="pin"
    />
  </div>
);

class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: { lat: 59.95, lng: 30.33 },
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
          key: process.env.GOOG_MAP,
        }}
        defaultCenter={this.state.defaultCenter}
        center={center}
        defaultZoom={17}
      >
        <Popup
          lat={center.lat}
          lng={center.lng}
        />
      </GoogleMapReact>
    );
  }
}

export default Gmap;
