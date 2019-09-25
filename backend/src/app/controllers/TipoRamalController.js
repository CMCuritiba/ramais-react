import TipoRamal from '../models/TipoRamal';

import paginate from '../helpers/paginate';

class TipoRamalController {
  async index(req, res) {
    const { _page } = req.query;
    const pageSize = 10;

    const tiposRamal = await TipoRamal.findAndCountAll(
      paginate(
        {
          attributes: ['id', 'nome'],
        },
        { page: _page, pageSize }
      )
    );

    return res.json({ count: tiposRamal.count, data: tiposRamal.rows });
  }
}

export default new TipoRamalController();
