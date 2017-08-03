import React from 'react';
import Login from './Login';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authClick: false,
    };
    this.openClose = this.openClose.bind(this);
  }

  openClose() {
    this.setState({ authClick: !this.state.authClick });
  }

  render() {
    const loginButton = !this.state.authClick ?
      (<button
        onClick={this.openClose}
        className="search-button btn"
      >
        Login/Signup</button>) : <Login openClose={this.openClose} />;
    return (
      <div>
        {loginButton}
      </div>
    );
  }
}

export default Auth;
