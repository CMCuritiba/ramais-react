import Setor from '../models/Setor';
import VSetor from '../models/VSetor';
import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';
import SetorValidator from '../validators/SetorValidator';

import paginate from '../helpers/paginate';

class SetorController {
  async index(req, res) {
    const { _page } = req.query;
    const pageSize = 10;

    try {
      const setores = await Setor.findAndCountAll(
        paginate(
          {
            attributes: ['id', 'set_id'],
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
          },
          { page: _page, pageSize }
        )
      );

      return res.json({ count: setores.count, data: setores.rows });
    } catch (err) {
      console.log(err);
    }
  }

  async store(req, res) {
    const validator = new SetorValidator();

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

    /**
     * Verifica vsetor
     */
    const { set_id } = req.body;

    const vSetor = await VSetor.findByPk(set_id);

    if (!vSetor) {
      return res.status(400).json({ error: 'Setor não é válido' });
    }

    try {
      const { id } = await Setor.create(req.body);
      return res.json({
        id,
        set_id,
        localizacao_id,
        pavimento_id,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Setor já cadastrado' });
    }
  }

  async update(req, res) {
    const validator = new SetorValidator();

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

    const setor = await Setor.findByPk(req.params.id);

    if (!setor) {
      return res.status(400).json({ error: 'Setor não encontrado' });
    }

    try {
      const { id, set_id } = await setor.update(req.body);
      return res.json({
        id,
        set_id,
        localizacao_id,
        pavimento_id,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Setor já cadastrado' });
    }
  }

  async delete(req, res) {
    const setor = await Setor.findByPk(req.params.id);

    if (!setor) {
      return res.status(400).json({ error: 'Setor não encontrado' });
    }

    await setor.destroy();

    return res.send();
  }
}

export default new SetorController();
