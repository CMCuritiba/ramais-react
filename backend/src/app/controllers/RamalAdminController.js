import Ramal from '../models/Ramal';
import TipoRamal from '../models/TipoRamal';
// import Setor from '../models/Setor';
import paginate from '../helpers/paginate';

class RamalAdminController {
  async index(req, res) {
    const { _page } = req.query;
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

    return res.json({ count: ramais.count, data: ramais.rows });
  }
}

export default new RamalAdminController();
