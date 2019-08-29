import Ramal from '../models/Ramal';
import TipoRamal from '../models/TipoRamal';
// import Setor from '../models/Setor';

class RamalAdminController {
  async index(req, res) {
    const ramais = await Ramal.findAll({
      attributes: ['id', 'numero'],
      include: [
        {
          model: TipoRamal,
          attributes: ['nome'],
        },
      ],
    });

    return res.json(ramais);
  }
}

export default new RamalAdminController();
