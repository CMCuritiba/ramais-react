import services from '../services/ramalespecial';
import ResponseGenerator from './util/ResponseGenerator';

class RamalEspecialController {
  async index(req, res) {
    const { _page } = req.query;

    const ramaisEspeciais = await services.List.run({ _page });

    return res.json({
      count: ramaisEspeciais.count,
      data: ramaisEspeciais.rows,
    });
  }

  async store(req, res) {
    const {
      localizacao_id,
      pavimento_id,
      nome,
      numero,
      visivel,
      ordem,
    } = req.body;

    try {
      const response = await services.Create.run({
        localizacao_id,
        pavimento_id,
        nome,
        numero,
        visivel,
        ordem,
      });

      return res.json(response);
    } catch (err) {
      return ResponseGenerator.run(res, err);
    }
  }

  async update(req, res) {
    const {
      localizacao_id,
      pavimento_id,
      nome,
      numero,
      visivel,
      ordem,
    } = req.body;

    const { id } = req.params;

    try {
      const response = await services.Update.run({
        id,
        localizacao_id,
        pavimento_id,
        nome,
        numero,
        visivel,
        ordem,
      });

      return res.json(response);
    } catch (err) {
      return ResponseGenerator.run(res, err);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const response = await services.Delete.run({ id });

      return res.json(response);
    } catch (err) {
      return ResponseGenerator.run(res, err);
    }
  }
}

export default new RamalEspecialController();
