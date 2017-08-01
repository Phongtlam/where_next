import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// this is similarly to doing async defer on HTML script tag

const InitMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    center={{ lat: props.currentPos.lat, lng: props.currentPos.lng }}
    defaultZoom={14}
    // defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

export default InitMap;
