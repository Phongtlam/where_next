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
          <input
            type="text"
            className="search-box form-control"
            id="input"
            placeholder="Where to go next..."
          />
        </div>
        <button
          type="submit"
          className="search-button btn btn-success"
        > <span className="fa fa-search" /><span> Search</span>
        </button>
      </form>
    );
  }
}

export default SearchBar;
