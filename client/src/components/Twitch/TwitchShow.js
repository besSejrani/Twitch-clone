import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class TwitchShow extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    const { twitch } = this.props;
    if (!twitch) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h1>{twitch.title}</h1>
        <h4>{twitch.description}</h4>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    twitch: state.twitch[ownProps.match.params.id]
  };
};

export default connect(
  mapState,
  { fetchStream }
)(TwitchShow);
