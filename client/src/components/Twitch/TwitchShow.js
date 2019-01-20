import React, { Component } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class TwitchShow extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer = () => {
    if (this.player || !this.props.twitch) {
      return;
    }
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  };

  render() {
    const { twitch } = this.props;
    if (!twitch) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
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
