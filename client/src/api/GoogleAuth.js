import React, { Component } from 'react';
import { signIn, signOut } from '../actions/index';
import { connect } from 'react-redux';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '126913799683-vffbq77n3gguggmmp8svhplt26vh7rub.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={() => this.onClickSignOut()}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui green google button"
          onClick={() => this.onClickSignIn()}
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onClickSignIn = () => {
    this.auth.signIn();
  };

  onClickSignOut = () => {
    this.auth.signOut();
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapState = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapState,
  { signIn, signOut }
)(GoogleAuth);
