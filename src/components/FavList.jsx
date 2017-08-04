import React from 'react';
import propTypes from 'prop-types';

class FavList extends React.Component {
  componentDidUpdate() {
    this.listEnd.scrollIntoView({ behavior: 'smooth' });
  }
  render() {
    return (
      <div>
        <div className="fav-container">
          <img onClick={() => this.props.textSearch(this.props.place.name)} className="fav-img" src={this.props.place.placeImg} alt={this.props.place.name} /><br />
          {this.props.place.name}
          <div
            // style={{ float: 'right' }}
            ref={(node) => { this.listEnd = node; }}
          />
        </div>
      </div>
    );
  }
}

export default FavList;

FavList.propTypes = {
  textSearch: propTypes.func,
};
