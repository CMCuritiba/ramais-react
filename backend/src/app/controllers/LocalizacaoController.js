import ResponseGenerator from './util/ResponseGenerator';

import services from '../services/localizacao';

class LocalizacaoController {
  async index(req, res) {
    const { _page } = req.query;

    const localizacoes = await services.List.run({ _page });

    return res.json({ count: localizacoes.count, data: localizacoes.rows });
  }

  async store(req, res) {
    const { nome } = req.body;

    const localizacao = await services.Create.run({ nome });

    return res.json({
      id: localizacao.id,
      nome: localizacao.nome,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const localizacao = await services.Update.run({ id, nome });
      return res.json(localizacao);
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

export default new LocalizacaoController();
