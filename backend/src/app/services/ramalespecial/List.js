import RamalEspecial from '../../models/RamalEspecial';
import Localizacao from '../../models/Localizacao';
import Pavimento from '../../models/Pavimento';
import paginate from '../../helpers/paginate';

class List {
  async run({ _page }) {
    const pageSize = 10;

    const ramaisEspeciais = await RamalEspecial.findAndCountAll(
      paginate(
        {
          attributes: ['id', 'nome', 'numero', 'visivel', 'ordem'],
          order: ['nome'],
          include: [
            {
              model: Localizacao,
              attributes: ['id', 'nome'],
            },
            {
              model: Pavimento,
              attributes: ['id', 'nome'],
            },
          ],
        },
        { page: _page, pageSize }
      )
    );

    return ramaisEspeciais;
  }
}

export default new List();
