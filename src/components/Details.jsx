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
    let priceDisplay;
    const price = Math.floor(details.price_level);
    switch (price) {
      case 1:
        priceDisplay = '$';
        break;
      case 2:
        priceDisplay = '$$';
        break;
      case 3:
        priceDisplay = '$$$';
        break;
      case 4:
        priceDisplay = '$$$$';
        break;
      case 5:
        priceDisplay = '$$$$$';
        break;
      default:
        priceDisplay = 'unknown';
        break;
    }
    return (
      <div className="details card">
        <img className="place-img card-img-top" src={this.props.placeImg} alt="location" />
        <div className="card-block">
          <h4 className="info-header card-title">{details.name}</h4>
          <p className="card-text">{details.formatted_address}<br />
            Price: {priceDisplay}<br />
            User's Rating: {details.rating}
          </p>
          <button onClick={this.onAdd} className="faa-parent animated-hover btn-warning btn">
            <span className="faa-vertical animated-hover fa fa-thumbs-o-up" />
            <span className="suggest"> Save this place!</span></button>
        </div>
      </div>
    );
  }
}

export default Details;
