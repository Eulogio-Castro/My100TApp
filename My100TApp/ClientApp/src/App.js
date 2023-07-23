import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'
import { TeamInfoTable } from './components/TeamInfoTable';
import { TeamSchedule } from './components/TeamSchedule';
import { LeagueYoutube } from './components/LeagueYoutube';
import { LeagueStandings } from './components/LeagueStandings';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/LeagueStandings' component={LeagueStandings} />
            <Route path='/TeamSchedule' component={TeamSchedule} />
            <Route path='/LeagueYoutube' component={LeagueYoutube} />
            <Route path='/TeamInfoTable' component={TeamInfoTable} />
      </Layout>
    );
  }
}
