import TipoRamal from '../models/TipoRamal';

import paginate from '../helpers/paginate';

import TipoRamalValidator from '../validators/TipoRamalValidator';

class TipoRamalController {
  async index(req, res) {
    const { _page } = req.query;
    const pageSize = 10;

    const tiposRamal = await TipoRamal.findAndCountAll(
      paginate(
        {
          attributes: ['id', 'nome'],
        },
        { page: _page, pageSize }
      )
    );

    return res.json({ count: tiposRamal.count, data: tiposRamal.rows });
  }

  async store(req, res) {
    const validator = new TipoRamalValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    try {
      const tipoRamal = await TipoRamal.create(req.body);
      return res.json({
        id: tipoRamal.id,
        nome: tipoRamal.nome,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async update(req, res) {
    const validator = new TipoRamalValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    const tipoRamal = await TipoRamal.findByPk(req.params.id);

    if (!tipoRamal) {
      return res.status(400).json({ error: 'Tipo Ramal não encontrado' });
    }

    try {
      const { id, nome } = await tipoRamal.update(req.body);
      return res.json({
        id,
        nome,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async delete(req, res) {
    const tipoRamal = await TipoRamal.findByPk(req.params.id);

    if (!tipoRamal) {
      return res.status(400).json({ error: 'Tipo Ramal não encontrado' });
    }

    await tipoRamal.destroy();

    return res.send();
  }
}

export default new TipoRamalController();
