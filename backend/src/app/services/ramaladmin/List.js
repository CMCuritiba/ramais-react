import Ramal from '../../models/Ramal';
import TipoRamal from '../../models/TipoRamal';

import paginate from '../../helpers/paginate';

class List {
  async run({ _page }) {
    const pageSize = 10;

    const ramais = await Ramal.findAndCountAll(
      paginate(
        {
          attributes: ['id', 'numero'],
          include: [
            {
              model: TipoRamal,
              attributes: ['nome'],
            },
          ],
        },
        { page: _page, pageSize }
      )
    );

    return ramais;
  }
}

export default new List();
