import TipoRamal from '../models/TipoRamal';

import paginate from '../helpers/paginate';

class TipoRamalController {
  async index(req, res) {
    const { page } = req.query;
    const pageSize = 10;

    const tiposRamal = await TipoRamal.findAll(
      paginate(
        {
          attributes: ['id', 'nome'],
        },
        { page, pageSize }
      )
    );

    return res.json(tiposRamal);
  }
}

export default new TipoRamalController();
