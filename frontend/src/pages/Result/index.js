import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { MdSearch } from 'react-icons/md';

import { Container, Pesquisa, Results } from './styles';
import SearchService from '../../service/SearchService';
import brasao from '../../assets/brasao.png';
import Lista from '../../components/Ramais/Lista';

class Result extends Component {
  constructor(props) {
    super(props);

    const {
      location: { search },
    } = this.props;

    const values = parse(search);

    this.state = {
      pesquisa: values.q,
      lista: [],
    };
  }

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;

    const values = parse(search);

    const lista = await SearchService.run(values);

    this.setState({ lista });
  }

  handleSubmit = async e => {
    const { pesquisa } = this.state;

    e.preventDefault();

    if (pesquisa.trim() === '') return;

    const lista = await SearchService.run({ q: pesquisa });

    this.setState({ lista });
  };

  handlePesquisaChange = e => {
    this.setState({ pesquisa: e.target.value });
  };

  render() {
    const { pesquisa, lista } = this.state;

    return (
      <Container>
        <Pesquisa>
          <form onSubmit={this.handleSubmit}>
            <img src={brasao} alt="Brasão CMC" />
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
        {lista.length >= 0 ? (
          <Results>
            <Lista lista={lista} />
          </Results>
        ) : (
          <p>Nenhum item encontrado</p>
        )}
      </Container>
    );
  }
}

export default withRouter(Result);
