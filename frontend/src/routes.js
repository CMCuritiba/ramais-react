import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Result from './pages/Result';

import Ramais from './pages/Admin/Ramais';
import Setor from './pages/Admin/Setor';
import Localizacao from './pages/Admin/Localizacao';
import Pavimento from './pages/Admin/Pavimento';

import history from './service/history';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/result" component={Result} />
        <Route path="/admin/ramais" component={Ramais} />
        <Route path="/admin/setores" component={Setor} />
        <Route path="/admin/localizacoes" component={Localizacao} />
        <Route path="/admin/pavimentos" component={Pavimento} />
      </Switch>
    </Router>
  );
}
