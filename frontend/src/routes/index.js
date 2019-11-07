import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Main from '../pages/Main';
import Result from '../pages/Result';

export default function Routes() {
  return (
    <Switch>
      {/* <Route path="/" exact component={Main} isPrivate /> */}
      <Route path="/" exact component={Main} />
      <Route path="/result" component={Result} />
    </Switch>
  );
}
