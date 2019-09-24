import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Result from './pages/Result';

import history from './service/history';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/result" component={Result} />
      </Switch>
    </Router>
  );
}
