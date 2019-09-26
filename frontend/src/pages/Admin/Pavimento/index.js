import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Container } from './styles';

import Header from '../../../components/layout/admin/Header';

class Pavimento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selected: 'PAVIMENTOS',
    };
  }
  render() {
    const { history } = this.props;
    const { selected } = this.state;

    return (
      <Container>
        <Header user="alexandre.odoni" history={history} selected={selected} />
        <p>CRUD PAVIMENTO</p>
      </Container>
    );
  }
}

export default withRouter(Pavimento);
