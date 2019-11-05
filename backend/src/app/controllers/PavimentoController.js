import services from '../services/pavimento';
import ResponseGenerator from './util/ResponseGenerator';

class PavimentoController {
  async index(req, res) {
    const { _page } = req.query;

    const pavimentos = await services.List.run({ _page });

    return res.json({ count: pavimentos.count, data: pavimentos.rows });
  }

  async store(req, res) {
    const { localizacao_id, nome } = req.body;

    try {
      const pavimento = await services.Create.run({ localizacao_id, nome });

      return res.json({
        id: pavimento.id,
        localizacao_id: pavimento.localizacao_id,
        nome: pavimento.nome,
      });
    } catch (err) {
      return ResponseGenerator.run(res, err);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { localizacao_id, nome } = req.body;

    try {
      const pavimento = await services.Update.run({ id, localizacao_id, nome });
      return res.json(pavimento);
    } catch (err) {
      return ResponseGenerator.run(res, err);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const retorno = await services.Delete.run({ id });
      return res.json(retorno);
    } catch (err) {
      return ResponseGenerator.run(res, err);
    }
  }
}

export default new PavimentoController();
