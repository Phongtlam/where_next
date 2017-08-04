import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginTab: true,
      signupTab: false,
      username: '',
      password: '',
    };
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.loginTab = this.loginTab.bind(this);
    this.signupTab = this.signupTab.bind(this);
    this.onInputUsername = this.onInputUsername.bind(this);
    this.onInputPassword = this.onInputPassword.bind(this);
  }

  onLoginSubmit(e) {
    e.preventDefault();
    const baseUrl = (process.env.NODE_ENV === 'development') ? `${process.env.REACT_APP_URL}/login` : '/login';
    fetch(baseUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    .then(data => data.json())
    .then((data) => {
      if (data) {
        console.log(data)
        // data = JSON.parse(data);
        const favList = JSON.parse(data.favorites);
        this.props.addToFavList(favList);
        this.props.openClose();
        this.props.getUsername(this.state.username);
        this.props.isWelcome();
      }
    })
    .catch((err) => {
      throw ('err', err);
    });
  }

  onSignupSubmit(e) {
    e.preventDefault();
    const baseUrl = (process.env.NODE_ENV === 'development') ? `${process.env.REACT_APP_URL}/signup` : '/signup';
    fetch(baseUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    .then((data) => {
      if (data) {
        this.props.openClose();
        this.props.getUsername(this.state.username);
        this.props.isWelcome();
      }
    })
    .catch((err) => {
      throw ('err', err);
    });
  }

  loginTab() {
    this.setState({
      signupTab: false,
      loginTab: true,
    });
  }

  signupTab() {
    this.setState({
      loginTab: false,
      signupTab: true,
    });
  }

  onInputUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onInputPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <div className="details card">
        <div className="card-block">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={this.loginTab} className="search-button btn">Login</button>
            <button onClick={this.signupTab} className="search-button btn">Signup</button>
          </div>
          <div onClick={() => this.props.openClose()} className="close-x"><strong>x</strong></div>
          {this.state.loginTab ?
            (
              <form onSubmit={this.onLoginSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input onChange={this.onInputUsername} className="form-control" name="username" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange={this.onInputPassword} className="form-control" name="password" />
                </div>
                <button onClick={this.onLoginSubmit} className="btn btn-warning">Login</button>
              </form>
            ) : (
              <form onSubmit={this.onSignupSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input onChange={this.onInputUsername} className="form-control" name="username" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input onChange={this.onInputPassword} className="form-control" name="password" />
                </div>
                <button onClick={this.onSignupSubmit} type="submit" className="btn btn-warning">Signup</button>
              </form>
            )
          }
        </div>
      </div>
    );
  }
}

export default Login;
