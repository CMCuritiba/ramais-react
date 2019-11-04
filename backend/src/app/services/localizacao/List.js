import Localizacao from '../../models/Localizacao';
import Pavimento from '../../models/Pavimento';

import paginate from '../../helpers/paginate';

class List {
  async run({ _page = 1 }) {
    const pageSize = 10;

    const localizacoes = await Localizacao.findAndCountAll(
      paginate(
        {
          order: ['nome'],
          attributes: ['id', 'nome'],
          include: [
            {
              model: Pavimento,
              attributes: ['id', 'nome'],
            },
          ],
        },
        { page: _page, pageSize }
      )
    );
    return localizacoes;
  }
}

export default new List();
