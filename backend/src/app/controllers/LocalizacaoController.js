import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';

class LocalizacaoController {
  async index(req, res) {
    const localizacoes = await Localizacao.findAll({
      order: ['nome'],
      attributes: ['id', 'nome'],
      include: [
        {
          model: Pavimento,
          attributes: ['id', 'nome'],
        },
      ],
    });

    return res.json(localizacoes);
  }
}

export default new LocalizacaoController();
