import RamalEspecial from '../models/RamalEspecial';
import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';

class RamalEspecialController {
  async index(req, res) {
    const ramaisEspeciais = await RamalEspecial.findAll({
      attributes: ['nome', 'numero', 'visivel', 'ordem'],
      order: ['nome'],
      include: [
        {
          model: Localizacao,
          attributes: ['nome'],
        },
        {
          model: Pavimento,
          attributes: ['nome'],
        },
      ],
    });

    return res.json(ramaisEspeciais);
  }
}

export default new RamalEspecialController();
