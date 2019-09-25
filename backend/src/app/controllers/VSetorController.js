import VSetor from '../models/VSetor';

import paginate from '../helpers/paginate';

class VSetorController {
  async index(req, res) {
    const { page } = req.query;
    const pageSize = 10;

    const setores = await VSetor.findAndCountAll(
      paginate(
        {
          attributes: ['id', 'set_nome'],
          order: ['id'],
        },
        { page, pageSize }
      )
    );

    return res.json({ count: setores.count, data: setores.rows });
  }
}

export default new VSetorController();
