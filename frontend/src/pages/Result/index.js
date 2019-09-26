import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { MdSearch } from 'react-icons/md';

import { Container, Pesquisa, Results } from './styles';
import SearchService from '../../service/SearchService';
import brasao from '../../assets/brasao.png';
import Lista from '../../components/Ramais/Lista';
import Paginator from '../../components/layout/Paginator';
import Spinner from '../../components/layout/Spinner';

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
      loading: 0,
    };

    // console.tron.log(`Pagina :${this.state._page}`);

    this.searchInput = React.createRef();
  }

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;

    this.setState({ loading: 1 });

    const values = parse(search);

    const lista = await SearchService.run(values);

    this.setState({ lista, _page: Number(values._page), loading: 0 });

    this.searchInput.current.focus();
  }

  handleSubmit = async e => {
    const { pesquisaNova } = this.state;
    const { history } = this.props;

    this.setState({ loading: 1 });

    e.preventDefault();

    if (pesquisaNova.trim() === '') return;

    const lista = await SearchService.run({ q: pesquisaNova, _page: 1 });

    this.setState({ lista, pesquisa: pesquisaNova, _page: 1, loading: 0 });

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

    this.setState({ loading: 1 });

    const lista = await SearchService.run({ q: pesquisaNova, _page: pagina });

    this.setState({ lista, _page: pagina, loading: 0 });

    history.push({
      pathname: '/result',
      search: `q=${pesquisaNova}&_page=${pagina}`,
    });
  };

  renderResults = () => {
    const { pesquisa, lista, loading, _page } = this.state;

    if (loading) return <Spinner />;
    if (lista.data && lista.data.length >= 0) {
      return (
        <>
          <Results>
            <Lista lista={lista.data} pesquisa={pesquisa} />
          </Results>
          <Paginator
            loading={loading}
            totalPages={lista.totalPages}
            handleClickPagina={this.handleClickPagina}
            page={_page}
          />
        </>
      );
    } else {
      return <p>Nenhum item encontrado</p>;
    }
  };

  render() {
    const { pesquisaNova, loading } = this.state;

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
            <button type="submit" disabled={loading}>
              <MdSearch size={20} />
            </button>
          </form>
        </Pesquisa>
        {this.renderResults()}
      </Container>
    );
  }
}

export default withRouter(Result);
