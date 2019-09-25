import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { MdSearch } from 'react-icons/md';

import { Container, Pesquisa, Results } from './styles';
import SearchService from '../../service/SearchService';
import brasao from '../../assets/brasao.png';
import Lista from '../../components/Ramais/Lista';
import Paginator from '../../components/layout/Paginator';

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
      _page: values._page ? values._page : 1,
    };

    // console.tron.log(`Pagina :${this.state._page}`);

    this.searchInput = React.createRef();
  }

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;

    const values = parse(search);

    const lista = await SearchService.run(values);

    this.setState({ lista, _page: Number(values._page) });

    this.searchInput.current.focus();
  }

  handleSubmit = async e => {
    const { pesquisaNova } = this.state;
    const { history } = this.props;

    e.preventDefault();

    if (pesquisaNova.trim() === '') return;

    const lista = await SearchService.run({ q: pesquisaNova, _page: 1 });

    this.setState({ lista, pesquisa: pesquisaNova, _page: 1 });

    history.push({
      pathname: '/result',
      search: `q=${pesquisaNova}&_page=1`,
    });
  };

  handlePesquisaChange = e => {
    this.setState({ pesquisaNova: e.target.value });
  };

  handleClickBrasao = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickPagina = async pagina => {
    const { history } = this.props;
    const { pesquisaNova } = this.state;

    const lista = await SearchService.run({ q: pesquisaNova, _page: pagina });

    this.setState({ lista, _page: pagina });

    history.push({
      pathname: '/result',
      search: `q=${pesquisaNova}&_page=${pagina}`,
    });
  };

  render() {
    const { pesquisa, lista, pesquisaNova, _page } = this.state;

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
        {lista.data && lista.data.length >= 0 ? (
          <>
            <Results>
              <Lista lista={lista.data} pesquisa={pesquisa} />
            </Results>
            <Paginator
              totalPages={lista.totalPages}
              handleClickPagina={this.handleClickPagina}
              page={_page}
            />
          </>
        ) : (
          <p>Nenhum item encontrado</p>
        )}
      </Container>
    );
  }
}

export default withRouter(Result);
