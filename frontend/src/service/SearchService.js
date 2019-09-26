import { latinise } from 'voca';

import api from './api';
import paginate from '../helpers/paginate';

class SearchService {
  async run({ q, _page }) {
    if (!q) {
      throw new Error('Não foi fornecida pesquisa');
    }
    // console.tron.log(`Pesquisando por: ${q} na página ${_page}`);

    const lista = await api.get(`lista_ramais`);

    const listaFiltrada = lista.data[0].data.filter(
      ({ ramais, funcionarios, nome }) => {
        if (
          funcionarios.some(funcionario =>
            latinise(funcionario.funcionario)
              .toLowerCase()
              .includes(latinise(q.toLowerCase()))
          ) ||
          ramais.some(ramal =>
            String(ramal.ramal)
              .toLowerCase()
              .includes(q.toLowerCase())
          ) ||
          latinise(nome)
            .toLowerCase()
            .includes(latinise(q.toLowerCase()))
        ) {
          return true;
        }
        return false;
      }
    );

    const filtradosPaginados = paginate({
      items: listaFiltrada,
      pageSize: 5,
      page: Number(_page),
    });

    // console.tron.log(filtradosPaginados);

    return {
      totalPages: filtradosPaginados.totalPages,
      data: filtradosPaginados.data,
    };
  }
}

export default new SearchService();
