import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/index';

class TwitchList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin = stream => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/twitch/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/twitch/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  renderList = () => {
    const { twitch } = this.props;
    return twitch.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon pause circle outline" />
          <div className="content">
            <Link to={`/twitch/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreateTwitch = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/twitch/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Twitch Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateTwitch()}
      </div>
    );
  }
}

const mapState = state => {
  return {
    twitch: Object.values(state.twitch),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapState,
  { fetchStreams }
)(TwitchList);
