import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const CLIENT_ID = '721324743664-u4lbuf8lacngbrebd1qhb1u1ngbjqbmq.apps.googleusercontent.com';


class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  login (response) {
    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
      this.props.isLogined && this.props.isLogined();      
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
    this.props.isLogouted && this.props.isLogouted();    
  }

  onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ', profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ', profile.getName());
    console.log('Image URL: ',profile.getImageUrl());
    console.log('Email: ', profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
          onSignIn={ this.onSignIn}
        />
      }     

    </div>
    )
  }
}

export default GoogleBtn;