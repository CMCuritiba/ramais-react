import Setor from '../models/Setor';
import VSetor from '../models/VSetor';
import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';

class SetorController {
  async index(req, res) {
    const setores = await Setor.findAll({
      attributes: ['id'],
      include: [
        {
          model: VSetor,
          attributes: ['id', 'set_nome'],
        },
        {
          model: Localizacao,
          attributes: ['id', 'nome'],
        },
        {
          model: Pavimento,
          attributes: ['id', 'nome'],
        },
      ],
      order: [[VSetor, 'id']],
    });

    return res.json(setores);
  }
}

export default new SetorController();
