import services from '../services/tiporamal';

import ResponseGenerator from './util/ResponseGenerator';

class TipoRamalController {
  async index(req, res) {
    const { _page } = req.query;

    const response = await services.List.run({ _page });

    return res.json(response);
  }

  async store(req, res) {
    const { nome } = req.body;

    const response = await services.Create.run({ nome });

    return res.json(response);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const response = await services.Update.run({ id, nome });
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

export default new TipoRamalController();
