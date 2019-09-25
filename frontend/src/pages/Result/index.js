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
      pesquisaNova: values.q,
    };

    this.searchInput = React.createRef();
  }

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;

    const values = parse(search);

    const lista = await SearchService.run(values);

    this.setState({ lista });

    this.searchInput.current.focus();
  }

  handleSubmit = async e => {
    const { pesquisa, pesquisaNova } = this.state;

    e.preventDefault();

    this.setState({ pesquisa: pesquisaNova });

    if (pesquisa.trim() === '') return;

    const lista = await SearchService.run({ q: pesquisaNova });

    this.setState({ lista });
  };

  handlePesquisaChange = e => {
    this.setState({ pesquisaNova: e.target.value });
  };

  handleClickBrasao = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { pesquisa, lista, pesquisaNova } = this.state;

    return (
      <Container>
        <Pesquisa>
          <form onSubmit={this.handleSubmit}>
            <img
              src={brasao}
              alt="Brasão CMC"
              onMouseUpCapture={this.handleClickBrasao}
            />
            <input
              ref={this.searchInput}
              type="text"
              placeholder="digite o setor, pessoa ou ramal"
              value={pesquisaNova}
              onChange={this.handlePesquisaChange}
            />
            <button type="submit">
              <MdSearch size={20} />
            </button>
          </form>
        </Pesquisa>
        {lista.length >= 0 ? (
          <Results>
            <Lista lista={lista} pesquisa={pesquisa} />
          </Results>
        ) : (
          <p>Nenhum item encontrado</p>
        )}
      </Container>
    );
  }
}

export default withRouter(Result);
