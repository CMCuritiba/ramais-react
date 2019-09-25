import Ramal from '../models/Ramal';
import TipoRamal from '../models/TipoRamal';
// import Setor from '../models/Setor';
import paginate from '../helpers/paginate';

class RamalAdminController {
  async index(req, res) {
    const { page } = req.query;
    const pageSize = 10;

    const ramais = await Ramal.findAll(
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
        { page, pageSize }
      )
    );

    return res.json(ramais);
  }
}

export default new RamalAdminController();
