import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd() {
    console.log('details', this.props.details)
    const details = this.props.details;
    this.props.addToFavList(details);
    const baseUrl = (process.env.NODE_ENV === 'development') ? `${process.env.REACT_APP_URL}/add` : '/add';
    fetch(baseUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.props.username,
        newAdd: details,
      }),
    })
    .catch((err) => {
      throw ('err', err);
    });
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
    const buttonLabel = this.props.username !== '' ? 'Save this place!' : 'Login/Signup to Save'
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
            <span> {buttonLabel}</span></button>
        </div>
      </div>
    );
  }
}

export default Details;
