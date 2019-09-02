import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';
import LocalizacaoValidator from '../validators/LocalizacaoValidator';

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

  async store(req, res) {
    const validator = new LocalizacaoValidator();

    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    const { id, nome } = await Localizacao.create(req.body);

    return res.json({
      id,
      nome,
    });
  }

  async update(req, res) {
    const validator = new LocalizacaoValidator();

    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    const localizacao = await Localizacao.findByPk(req.params.id);

    if (!localizacao) {
      return res.status(400).json({ error: 'Localização não encontrada' });
    }

    await localizacao.update(req.body);

    return res.json(localizacao);
  }

  async delete(req, res) {
    const localizacao = await Localizacao.findByPk(req.params.id);

    if (!localizacao) {
      return res.status(400).json({ error: 'Localização não encontrada' });
    }

    await localizacao.destroy();

    return res.send();
  }
}

export default new LocalizacaoController();
