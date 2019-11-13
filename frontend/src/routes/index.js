import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Main from '../pages/Main';
import Result from '../pages/Result';
import SignIn from '../pages/SignIn';

import Pavimento from '../pages/Admin/Pavimento';
import Localizacao from '../pages/Admin/Localizacao';
import Ramais from '../pages/Admin/Ramais';
import Setor from '../pages/Admin/Setor';

export default function Routes() {
  return (
    <Switch>
      {/* <Route path="/" exact component={Main} isPrivate /> */}
      <Route path="/" exact component={Main} />
      <Route path="/result" component={Result} />
      <Route path="/signin" component={SignIn} />
      <Route
        path="/admin/pavimentos"
        component={Pavimento}
        isPrivate
        selected={'PAVIMENTOS'}
      />
      <Route
        path="/admin/localizacoes"
        component={Localizacao}
        isPrivate
        selected={'LOCALIZACOES'}
      />
      <Route
        path="/admin/ramais"
        component={Ramais}
        isPrivate
        selected={'RAMAIS'}
      />
      <Route
        path="/admin/setores"
        component={Setor}
        isPrivate
        selected={'SETORES'}
      />
    </Switch>
  );
}
