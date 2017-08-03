import auth0 from 'auth0-js';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'plam.auth0.com',
    clientID: 'lCCYHZxP6_Ef-cDqK74ICx1ya-cJ26BL',
    redirectUri: 'http://localhost:3000',
    audience: 'https://plam.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}

export default Auth;
