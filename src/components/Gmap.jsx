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
      position: {
        lat: null,
        lng: null,
      }
    };
    this.initMap = this.initMap.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.getMarker = this.getMarker.bind(this);
    this.getInfoWindow = this.getInfoWindow.bind(this);
    this.setMapElementReference = this.setMapElementReference.bind(this);
    this.geocoder = new window.google.maps.Geocoder();
  }

  componentDidMount() {
    this.initMap();
  }

  onSubmit(event) {
    event.preventDefault();
    this.geocodeAddress(this.inputElement.value);
  }

  onInput(input) {
    this.inputElement = input;
  }

  getInfoWindow() {
    this.infowindow = new window.google.maps.InfoWindow({
      content: '<button>click</button>',
    });
    this.infowindow.open(this.map, this.marker);
  }

  setMapElementReference(mapElementReference) {
    this.mapElement = mapElementReference;
  }

  getMarker(position) {
    this.marker = new window.google.maps.Marker({
      map: this.map,
      animation: window.google.maps.Animation.DROP,
      position: {
        lat: position.lat,
        lng: position.lng,
      },
    });
    this.marker.addListener('click', this.getInfoWindow);
  }

  geocodeAddress(address) {
    this.inputElement.value = '';
    const input = (typeof (address) === 'string') ? { address } : { placeId: address.place_id };
    this.geocoder.geocode(input, (results, status) => {
      if (status !== 'OK') {
        return;
      }
      this.map.setZoom(11);
      this.map.setCenter(results[0].geometry.location);
      this.marker.setPosition(results[0].geometry.location);
    });
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
        if (this.infowindow) {
          this.infowindow.close();
        }
        const place = this.autocomplete.getPlace();
        // need this check else will error out
        if (!place.geometry) {
          return;
        }
        this.geocodeAddress(place);
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
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
