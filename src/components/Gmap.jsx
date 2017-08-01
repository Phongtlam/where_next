import React from 'react';

var INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 8;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};


const getCoords = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
    // resolve(position);
  }, reject);
});


class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address,
      position: {
        lat: null,
        lng: null,
      }
    };
    this.setSearchInputElementReference = this.setSearchInputElementReference.bind(this);
    this.setMapElementReference = this.setMapElementReference.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
      this.setState(() => ({
        // markers: prevState.markers.concat(newMarker),
        position: { lat: position.lat, lng: position.lng },
      }));
    })
    .catch((err) => {
      console.error(err.message);
    });

    const mapElement = this.mapElement;

    this.map = new window.google.maps.Map(mapElement, {
      zoom: 14,
      center: {
        lat: this.state.position.lat,
        lng: this.state.position.lng,
      },
    });

    this.marker = new window.google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude,
      },
    });

    this.geocoder = new window.google.maps.Geocoder();
  }

  geocodeAddress(address) {
    this.geocoder.geocode({ address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false,
        });

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true,
      });

      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude,
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude,
      });
    });
  }

  handleFormSubmit(submitEvent) {
    submitEvent.preventDefault();

    const address = this.searchInputElement.value;

    this.geocodeAddress(address);
  }

  setSearchInputElementReference(inputReference) {
    this.searchInputElement = inputReference;
  }

  setMapElementReference(mapElementReference) {
    this.mapElement = mapElementReference;
  }

  render() {
    return (
      <div>
        <div className="gmap" ref={this.setMapElementReference} />
        <form className="search">
          <div className="form-group">
            <input
              type="text"
              className="search-box form-control"
              id="input"
              placeholder="Where to go next..."
            />
            <button
              type="submit"
              className="search-button btn"
            > <span className="fa fa-search" /><span> Search</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Gmap;
