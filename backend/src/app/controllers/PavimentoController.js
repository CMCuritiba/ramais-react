import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';
import PavimentoValidator from '../validators/PavimentoValidator';

class PavimentoController {
  async index(req, res) {
    const pavimentos = await Pavimento.findAll({
      order: ['nome'],
      attributes: ['id', 'nome'],
      include: [
        {
          model: Localizacao,
          attributes: ['id', 'nome'],
        },
      ],
    });

    return res.json(pavimentos);
  }

  async store(req, res) {
    const validator = new PavimentoValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    /**
     * Verifica se localização é válida
     */
    const { localizacao_id } = req.body;

    if (!(await Localizacao.findByPk(localizacao_id))) {
      return res.status(400).json({ error: 'Localização inválida.' });
    }

    const { id, nome } = await Pavimento.create(req.body);

    return res.json({
      id,
      nome,
      localizacao_id,
    });
  }

  async update(req, res) {
    const validator = new PavimentoValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    /**
     * Verifica se localização é válida
     */
    const { localizacao_id } = req.body;

    if (!(await Localizacao.findByPk(localizacao_id))) {
      return res.status(400).json({ error: 'Localização inválida.' });
    }

    /**
     * Verifica se pavimento é válido
     */
    const pavimento = await Pavimento.findByPk(req.params.id);
    if (!pavimento) {
      return res.status(400).json({ error: 'Pavimento não encontrado' });
    }

    await pavimento.update(req.body);

    return res.json(pavimento);
  }

  async delete(req, res) {
    const pavimento = await Pavimento.findByPk(req.params.id);

    if (!pavimento) {
      return res.status(400).json({ error: 'Pavimento não encontrado' });
    }

    await pavimento.destroy();

    return res.send();
  }
}

export default new PavimentoController();
