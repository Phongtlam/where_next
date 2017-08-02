import React from 'react';

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
      foundAddress: null,
      position: {
        lat: null,
        lng: null,
      }
    };
    this.initMap = this.initMap.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.getMarker = this.getMarker.bind(this);
    this.setMapElementReference = this.setMapElementReference.bind(this);
    this.geocoder = new window.google.maps.Geocoder();
  }

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    getCoords()
    .then((position) => {
      this.map = new window.google.maps.Map(this.mapElement, {
        zoom: 14,
        center: {
          lat: position.lat,
          lng: position.lng,
        },
      });
      this.getMarker(position);
      this.autocomplete = new window.google.maps.places.Autocomplete(this.inputElement);
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        console.log('place is', place)
        // if (!place.geometry) {
        //   window.alert('No details for ', place.name);
        //   return;
        // }
        if (place.geometry.viewport) {
          this.map.setCenter(place.geometry.location);
          this.marker.setPosition(place.geometry.location);
          // this.getMarker(place.geometry.location);
          this.inputElement.value = '';
        }
      })
    })
    .catch((err) => {
      console.error(err.message);
    });
  }

  getMarker(position) {
    console.log('position is', position)
    this.marker = new window.google.maps.Marker({
      map: this.map,
      animation: window.google.maps.Animation.DROP,
      position: {
        lat: position.lat,
        lng: position.lng,
      },
    });
  }

  geocodeAddress(address) {
    this.geocoder.geocode({ address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false,
        });

        console.log('geo result', results)
        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true,
      });
    });
  }

  onSubmit(event) {
    event.preventDefault();
    // this.geocodeAddress(this.inputElement.value);
    this.autocomplete(this.inputElement.value);
    this.inputElement.value = '';
    // can split out from submit
  }

  onInput(input) {
    this.inputElement = input;
  }

  setMapElementReference(mapElementReference) {
    this.mapElement = mapElementReference;
  }

  render() {
    return (
      <div>
        <div className="gmap" ref={this.setMapElementReference} />
        <form className="search" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="search-box form-control"
              placeholder="Where to go next..."
              ref={this.onInput}
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
