import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Container } from './styles';

import Header from '../../../components/layout/admin/Header';

class Localizacao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  render() {
    const { history } = this.props;

    return (
      <Container>
        <Header user="alexandre.odoni" history={history} />
        <p>CRUD LOCALIZAÇÃO</p>
      </Container>
    );
  }
}

export default withRouter(Localizacao);
