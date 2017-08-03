import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd() {
    console.log('details', this.props.details)
    this.props.addToFavList(this.props.details);
  }

  render() {
    const details = this.props.details;
    return (
      <div className="details card">
        <img className="place-img card-img-top" src={this.props.placeImg} alt="location" />
        <div className="card-block">
          <h4 className="info-header card-title">{details.name}</h4>
          <p className="card-text">{details.formatted_address}<br />
            User's Rating: {details.rating}
          </p>
          <button onClick={this.onAdd} className="faa-parent animated-hover add-fav btn">
            <span className="faa-vertical animated-hover fa fa-thumbs-o-up" />
            <span className="suggest"> Suggest this!</span></button>
        </div>
      </div>
    );
  }
}

export default Details;
