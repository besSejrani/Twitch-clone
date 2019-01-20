import React, { Component } from 'react';
import TwitchForm from './TwitchForm';
import { connect } from 'react-redux';
import { createTwitch } from '../../actions';

class TwitchCreate extends Component {
  onSubmit = formValues => {
    const { createTwitch } = this.props;
    createTwitch(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a stream</h3>
        <TwitchForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createTwitch }
)(TwitchCreate);
