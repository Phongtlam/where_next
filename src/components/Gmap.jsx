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
      },
      places: [],
    };
    this.initMap = this.initMap.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.textSearch = this.textSearch.bind(this);
    this.getMarker = this.getMarker.bind(this);
    this.setMapElementReference = this.setMapElementReference.bind(this);
    this.clicky = this.clicky.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  onSubmit(event) {
    event.preventDefault();
    this.textSearch(this.inputElement.value);
  }

  onInput(input) {
    this.inputElement = input;
  }

  setMapElementReference(mapElementReference) {
    this.mapElement = mapElementReference;
  }

  textSearch(place) {
    if (this.infowindow) {
      this.infowindow.close();
    }
    const query = (typeof (place) === 'string') ? place : place.name;
    this.inputElement.value = '';
    this.service.textSearch({
      location: this.map.getCenter(),
      radius: '1000',
      query,
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.setState((prevState) => {
          return { places: prevState.places.concat(results) }
        }, () => {
          // for (let i = 0; i < this.state.places.length; i += 1) {
          //   this.getMarker(this.state.places[i]);
          // }
          this.map.setCenter(results[0].geometry.location);
          this.getMarker(this.state.places[this.state.places.length - 1]);
        })
      }
      if (status !== 'OK') {
        return;
      }
      // this.map.setZoom(16);
      // this.marker.setAnimation(window.google.maps.Animation.DROP);
      // this.marker.setPosition(results[0].geometry.location);
      // this.map.setCenter(results[0].geometry.location);
      console.log('results is', results[0]);
      // let openNow = 'Unknown';
      // if (results[0].opening_hours) {
      //   openNow = results[0].opening_hours.open_now === true ? 'Yes' : 'No';
      // }
      // const contentString =
      //   `<div class="info-header"><h4>${results[0].name}</h4><img src="${results[0].icon}" alt="place type"></div>` +
      //   `<p>Rating: ${results[0].rating}</span><br/>` +
      //   `Open now: ${openNow}</p>`
      // this.marker.addListener('click', this.getInfoWindow(contentString));
    });
  }

  getMarker(place) {
    const bounds = new window.google.maps.LatLngBounds();
    const image = {
      url: place.icon,
      size: new window.google.maps.Size(20, 32),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(0, 32),
      scaledSize: new window.google.maps.Size(25, 25)
    };

    this.marker = new window.google.maps.Marker({
      map: this.map,
      icon: image,
      title: place.name,
      animation: window.google.maps.Animation.DROP,
      position: place.geometry.location
    });
    let openNow = 'Unknown';
    if (place.opening_hours) {
      openNow = place.opening_hours.open_now === true ? 'Yes' : 'No';
    }
    // const address = place.formatted_address ?

    const contentString =
      `<div class="info-header" ref="info"><h4>${place.name}</h4></div>` +
      `<p>${place.formatted_address}<br/>` +
      `Rating: ${place.rating}<br/>` +
      `Open now: ${openNow}</p>` +
      '<div id="add-button></div>"';

    // placeList.innerHTML += '<li>' + place.name + '</li>';

    bounds.extend(place.geometry.location);
    this.map.fitBounds(bounds);
    this.map.setZoom(16);
    this.marker.addListener('click', () => {
      this.map.setCenter(this.marker.getPosition());
      this.infowindow.setContent(contentString);
      this.infowindow.open(this.map, this.marker);
    });
  }

  clicky() {
    console.log('clickkk meeee')
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
        animation: window.google.maps.Animation.DROP,
        position: {
          lat: position.lat,
          lng: position.lng,
        },
      });
      // this.marker.addListener('click', this.getInfoWindow);
      this.infowindow = new window.google.maps.InfoWindow();
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

  componentDidUnMount() {
    window.google.maps.event.clearListeners(this.map, 'zoom_changed')
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
