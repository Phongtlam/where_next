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
    this.textSearch = this.textSearch.bind(this);
    this.getInfoWindow = this.getInfoWindow.bind(this);
    this.setMapElementReference = this.setMapElementReference.bind(this);
    this.geocoder = new window.google.maps.Geocoder();
  }

  componentDidMount() {
    this.initMap();
  }

  onSubmit(event) {
    event.preventDefault();
    // this.geocodeAddress(this.inputElement.value);
    this.textSearch(this.inputElement.value);
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

  geocodeAddress(address) {
    this.inputElement.value = '';
    const input = (typeof (address) === 'string') ? { address } : { placeId: address.place_id };
    this.geocoder.geocode(input, (results, status) => {
      if (status !== 'OK') {
        return;
      }
      console.log('results is', results[0])
      this.map.setZoom(16);
      this.map.setCenter(results[0].geometry.location);
      this.marker.setPosition(results[0].geometry.location);
    });
  }

  textSearch(place) {
    this.inputElement.value = '';
    this.service.textSearch({ query: place }, (results, status) => {
      // if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      //   for (let i = 0; i < results.length; i += 1) {
      //     this.getMarker(results[i]);
      //   }
      // }
      if (status !== 'OK') {
        return;
      }
      console.log('results', results[0])
      this.map.setZoom(16);
      this.marker.setPosition(results[0].geometry.location);
      this.map.setCenter(results[0].geometry.location);
    });
  }

  getMarker(place) {
    const bounds = new window.google.maps.LatLngBounds();
    const image = {
      url: place.icon,
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25)
    };

    this.marker = new window.google.maps.Marker({
      map: this.map,
      // icon: image,
      title: place.name,
      position: place.geometry.location
    });

    // placeList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);
    this.map.fitBounds(bounds);
    this.marker.addListener('click', this.getInfoWindow);
  }

  initMap() {
    getCoords()
    .then((position) => {
      this.map = new window.google.maps.Map(this.mapElement, {
        zoom: 12,
        center: {
          lat: position.lat,
          lng: position.lng,
        },
      });
      this.marker = new window.google.maps.Marker({
        map: this.map,
        position: {
          lat: position.lat,
          lng: position.lng,
        },
      });
      // this.marker.addListener('click', this.getInfoWindow);
      this.service = new window.google.maps.places.PlacesService(this.map);
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
        // this.geocodeAddress(place);
        this.textSearch(place);
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
        <div className="infowindow" ref={this.setInfoReference} />
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
