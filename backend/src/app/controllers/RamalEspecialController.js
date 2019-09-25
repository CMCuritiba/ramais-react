import RamalEspecial from '../models/RamalEspecial';
import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';
import RamalEspecialValidator from '../validators/RamalEspecialValidator';

import paginate from '../helpers/paginate';

class RamalEspecialController {
  async index(req, res) {
    const { page } = req.query;
    const pageSize = 10;

    const ramaisEspeciais = await RamalEspecial.findAll(
      paginate(
        {
          attributes: ['id', 'nome', 'numero', 'visivel', 'ordem'],
          order: ['nome'],
          include: [
            {
              model: Localizacao,
              attributes: ['id', 'nome'],
            },
            {
              model: Pavimento,
              attributes: ['id', 'nome'],
            },
          ],
        },
        { page, pageSize }
      )
    );

    return res.json(ramaisEspeciais);
  }

  async store(req, res) {
    const validator = new RamalEspecialValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    /**
     * Verifica localizacao
     */
    const { localizacao_id } = req.body;

    const localizacao = await Localizacao.findByPk(localizacao_id);

    if (!localizacao) {
      return res.status(400).json({ error: 'Localização não é válida' });
    }

    /**
     * Verifica pavimento
     */
    const { pavimento_id } = req.body;

    const pavimento = await Pavimento.findByPk(pavimento_id);

    if (!pavimento) {
      return res.status(400).json({ error: 'Pavimento não é válido' });
    }

    try {
      const { id, nome, numero, visivel, ordem } = await RamalEspecial.create(
        req.body
      );

      return res.json({
        id,
        nome,
        numero,
        visivel,
        ordem,
        localizacao_id,
        pavimento_id,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Ramal Especial já cadastrado' });
    }
  }

  async update(req, res) {
    const validator = new RamalEspecialValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    /**
     * Verifica localizacao
     */
    const { localizacao_id } = req.body;

    const localizacao = await Localizacao.findByPk(localizacao_id);

    if (!localizacao) {
      return res.status(400).json({ error: 'Localização não é válida' });
    }

    /**
     * Verifica pavimento
     */
    const { pavimento_id } = req.body;

    const pavimento = await Pavimento.findByPk(pavimento_id);

    if (!pavimento) {
      return res.status(400).json({ error: 'Pavimento não é válido' });
    }

    const ramal = await RamalEspecial.findByPk(req.params.id);

    if (!ramal) {
      return res.status(400).json({ error: 'Ramal Especial não encontrado' });
    }

    try {
      const { id, nome, numero, visivel, ordem } = await ramal.update(req.body);
      return res.json({
        id,
        nome,
        numero,
        visivel,
        ordem,
        localizacao_id,
        pavimento_id,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Ramal Especial já cadastrado' });
    }
  }

  async delete(req, res) {
    const ramal = await RamalEspecial.findByPk(req.params.id);

    if (!ramal) {
      return res.status(400).json({ error: 'Ramal Especial não encontrado' });
    }

    await ramal.destroy();

    return res.send();
  }
}

export default new RamalEspecialController();
