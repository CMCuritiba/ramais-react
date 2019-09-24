import { latinise } from 'voca';

import api from './api';

class SearchService {
  async run({ q }) {
    if (!q) {
      throw new Error('Não foi fornecida pesquisa');
    }
    // console.tron.log(`Pesquisando por: ${q}`);
    const lista = await api.get(`lista_ramais`);

    const listaFiltrada = lista.data.filter(
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

    // console.tron.log(listaFiltrada);
    // return lista.data;
    return listaFiltrada;
  }
}

export default new SearchService();
