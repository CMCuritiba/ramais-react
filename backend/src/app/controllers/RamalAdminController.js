import ResponseGenerator from './util/ResponseGenerator';
import services from '../services/ramaladmin';

class RamalAdminController {
  async index(req, res) {
    const { _page } = req.query;

    const ramais = await services.List.run({ _page });

    return res.json({ count: ramais.count, data: ramais.rows });
  }

  async store(req, res) {
    const { tipo_ramal_id, setor_id, numero, visivel } = req.body;

    try {
      const response = await services.Create.run({
        tipo_ramal_id,
        setor_id,
        numero,
        visivel,
      });

      return res.json(response);
    } catch (err) {
      return ResponseGenerator.run(res, err);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { tipo_ramal_id, setor_id, numero, visivel } = req.body;
    try {
      const response = await services.Update.run({
        id,
        tipo_ramal_id,
        setor_id,
        numero,
        visivel,
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

export default new RamalAdminController();
