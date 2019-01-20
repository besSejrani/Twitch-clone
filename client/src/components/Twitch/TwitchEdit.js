import _ from 'lodash';
import React, { Component } from 'react';
import { fetchStream, editTwitch } from '../../actions/index';
import { connect } from 'react-redux';
import TwitchForm from './TwitchForm';

class TwitchEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editTwitch(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.twitch) {
      return <div>loading</div>;
    }
    return (
      <div>
        <h3>Edit stream: {this.props.twitch.title}</h3>
        <TwitchForm
          initialValues={_.pick(this.props.twitch, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return { twitch: state.twitch[ownProps.match.params.id] };
};

export default connect(
  mapState,
  { fetchStream, editTwitch }
)(TwitchEdit);
