import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillMount() {
    // var searchBox = new window.google.maps.places.SearchBox()
  }

  onSearch() {

  }

  render() {
    return (
      <form>
        <div className="search form-group">
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
    );
  }
}

export default SearchBar;
