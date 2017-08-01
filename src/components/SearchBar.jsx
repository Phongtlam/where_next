import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  render() {
    return (
      <form>
        <div className="search form-group">
          <label htmlFor="SearchBar">Where do we go?</label>
          <input type="text" className="search-box form-control" id="input" />
        </div>
        <button
          type="submit"
          className="search-button btn btn-search btn-success"
        > <span className="fa fa-search" /><span> Search</span>
        </button>
      </form>
    );
  }
}

export default SearchBar;
