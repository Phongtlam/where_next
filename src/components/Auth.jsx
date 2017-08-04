import React from 'react';
import Login from './Login';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authClick: false,
      isWelcome: false,
    };
    this.openClose = this.openClose.bind(this);
    this.isWelcome = this.isWelcome.bind(this);
  }

  openClose() {
    this.setState({ authClick: !this.state.authClick });
  }

  isWelcome() {
    this.setState({ isWelcome: true });
  }

  render() {
    const buttonLabel = this.state.isWelcome ? 'Welcome Back!' : 'Login/Signup';
    const loginButton = !this.state.authClick ?
      (<button
        onClick={this.openClose}
        className="search-button btn"
      >
        {buttonLabel}</button>) : <Login {...this.props} isWelcome={this.isWelcome} openClose={this.openClose} />;
    return (
      <div>
        {loginButton}
      </div>
    );
  }
}

export default Auth;
