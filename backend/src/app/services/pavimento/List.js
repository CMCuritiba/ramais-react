import Pavimento from '../../models/Pavimento';
import Pavimento from '../../models/Pavimento';
import Localizacao from '../../models/Localizacao';
import paginate from '../../helpers/paginate';

class List {
  async run({ _page }) {
    const pageSize = 10;

    const pavimentos = await Pavimento.findAndCountAll(
      paginate(
        {
          order: ['nome'],
          attributes: ['id', 'nome'],
          include: [
            {
              model: Localizacao,
              attributes: ['id', 'nome'],
            },
          ],
        },
        { page: _page, pageSize }
      )
    );

    return pavimentos;
  }
}

export default new List();
