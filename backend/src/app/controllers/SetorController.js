import ResponseGenerator from './util/ResponseGenerator';

import services from '../services/setor';

class SetorController {
  async index(req, res) {
    const { _page } = req.query;

    const setores = await services.List.run({ _page });

    return res.json({ count: setores.count, data: setores.rows });
  }

  async store(req, res) {
    const { localizacao_id, pavimento_id, set_id } = req.body;

    try {
      const { id } = await services.Create.run({
        localizacao_id,
        pavimento_id,
        set_id,
      });

      return res.json({
        id,
        set_id,
        localizacao_id,
        pavimento_id,
      });
    } catch (err) {
      return ResponseGenerator.run(res, err);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { localizacao_id, pavimento_id, set_id } = req.body;

    try {
      const setor = await services.Update.run({
        id,
        localizacao_id,
        pavimento_id,
        set_id,
      });

      return res.json({
        id: setor.id,
        set_id: setor.set_id,
        localizacao_id: setor.localizacao_id,
        pavimento_id: setor.pavimento_id,
      });
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

export default new SetorController();
