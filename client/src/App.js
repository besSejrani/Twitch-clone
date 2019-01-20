import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import Header from './components/Layout/Header';

import TwitchList from './components/Twitch/TwitchList';
import TwitchCreate from './components/Twitch/TwitchCreate';
import TwitchEdit from './components/Twitch/TwitchEdit';
import TwitchDelete from './components/Twitch/TwitchDelete';
import TwitchShow from './components/Twitch/TwitchShow';

class App extends Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: '30px' }}>
        <Router history={history}>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/" exact component={TwitchList} />
              <Route path="/twitch/new" exact component={TwitchCreate} />
              <Route path="/twitch/edit/:id" exact component={TwitchEdit} />
              <Route path="/twitch/delete/:id" exact component={TwitchDelete} />
              <Route path="/twitch/:id" exact component={TwitchShow} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
