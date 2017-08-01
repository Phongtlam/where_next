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
  static defaultProps = {
    center: { lat: 0, lng: 0 },
    zoom: 15
  };
  constructor(props) {
    super(props);
  }

  render() {
    const center = {
      lat: this.props.lat,
      lng: this.props.lng,
    };
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOG_MAP,
        }}
        defaultCenter={this.props.center}
        center={center}
        defaultZoom={this.props.zoom}
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
