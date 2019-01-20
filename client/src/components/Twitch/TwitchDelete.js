import React, { Component } from 'react';
import Modal from '../function/Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteTwitch } from '../../actions';
import { Link } from 'react-router-dom';

class TwitchDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions = () => {
    const { id } = this.props.match.params;
    return (
      <>
        <Link to="/" className="ui button">
          Cancel
        </Link>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteTwitch(id)}
        >
          Delete
        </button>
      </>
    );
  };

  renderContent = () => {
    if (!this.props.twitch) {
      return 'Are you sure you want to delete this stream ?';
    }
    return `Are you sure you want to delete the ${
      this.props.twitch.title
    } stream
        ?`;
  };

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
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
  { fetchStream, deleteTwitch }
)(TwitchDelete);
