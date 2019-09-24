import React, { Component } from 'react';
import { MdSearch } from 'react-icons/md';
import { GoFilePdf } from 'react-icons/go';
import { withRouter } from 'react-router-dom';

import { Container, Pesquisa, Header, Footer, Content } from './styles';
import brasao from '../../assets/brasao.png';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pesquisa: '',
    };
  }

  handleSubmit = e => {
    const { pesquisa } = this.state;
    const { history } = this.props;

    e.preventDefault();

    if (pesquisa.trim() === '') return;

    this.setState({ pesquisa: '' });
    history.push({
      pathname: '/result',
      search: `q=${pesquisa}`,
    });
  };

  handlePesquisaChange = e => {
    this.setState({ pesquisa: e.target.value });
  };

  render() {
    const { pesquisa } = this.state;

    return (
      <Container>
        <Content>
          <Header>
            <img src={brasao} alt="Brasão CMC" />
            <h1>Ramais CMC</h1>
          </Header>
          <Pesquisa>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="digite o setor, pessoa ou ramal"
                value={pesquisa}
                onChange={this.handlePesquisaChange}
              />
              <button type="submit">
                <MdSearch size={20} />
              </button>
            </form>
          </Pesquisa>
        </Content>
        <Footer>
          <div>Download da lista completa</div>
          <span>
            <GoFilePdf size={20} />
          </span>
        </Footer>
      </Container>
    );
  }
}

export default withRouter(Main);
