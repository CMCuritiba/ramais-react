import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Container } from './styles';

import Header from '../../../components/layout/admin/Header';

class Ramais extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selected: 'RAMAIS',
    };
  }
  render() {
    const { history } = this.props;
    const { selected } = this.state;

    return (
      <Container>
        <Header user="alexandre.odoni" history={history} selected={selected} />
        <p>CRUD RAMAIS</p>
      </Container>
    );
  }
}

export default withRouter(Ramais);
