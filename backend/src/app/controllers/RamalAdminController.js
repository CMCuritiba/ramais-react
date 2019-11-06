import Ramal from '../models/Ramal';
import TipoRamal from '../models/TipoRamal';
import Setor from '../models/Setor';
import paginate from '../helpers/paginate';

class RamalAdminController {
  async index(req, res) {
    const { _page } = req.query;
    const pageSize = 10;

    const ramais = await Ramal.findAndCountAll(
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
        { page: _page, pageSize }
      )
    );

    return res.json({ count: ramais.count, data: ramais.rows });
  }
  async store(req, res) {
    /**
     * Verifica tipo ramal
     */
    const { tipo_ramal_id } = req.body;

    const tipoRamal = await TipoRamal.findByPk(tipo_ramal_id);

    if (!tipoRamal) {
      return res.status(400).json({ error: 'Tipo de Ramal não é válido' });
    }

    /**
     * Verifica setor
     */
    const { setor_id } = req.body;

    const setor = await Setor.findByPk(setor_id);

    if (!setor) {
      return res.status(400).json({ error: 'Setor não é válido' });
    }

    try {
      const { id, numero, visivel } = await Ramal.create(req.body);

      return res.json({
        id,
        numero,
        visivel,
        tipo_ramal_id,
        setor_id,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Ramal já cadastrado' });
    }
  }

  async update(req, res) {
    const validator = new RamalValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    /**
     * Verifica tipo ramal
     */
    const { tipo_ramal_id } = req.body;

    const tipoRamal = await TipoRamal.findByPk(tipo_ramal_id);

    if (!tipoRamal) {
      return res.status(400).json({ error: 'Tipo de Ramal não é válido' });
    }

    /**
     * Verifica setor
     */
    const { setor_id } = req.body;

    const setor = await Setor.findByPk(setor_id);

    if (!setor) {
      return res.status(400).json({ error: 'Setor não é válido' });
    }

    const ramal = await Ramal.findByPk(req.params.id);

    if (!ramal) {
      return res.status(400).json({ error: 'Ramal não encontrado' });
    }

    try {
      const { id, numero, visivel } = await ramal.update(req.body);
      return res.json({
        id,
        numero,
        visivel,
        tipo_ramal_id,
        setor_id,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Ramal já cadastrado' });
    }
  }

  async delete(req, res) {
    const ramal = await Ramal.findByPk(req.params.id);

    if (!ramal) {
      return res.status(400).json({ error: 'Ramal não encontrado' });
    }

    await ramal.destroy();

    return res.send();
  }
}

export default new RamalAdminController();
