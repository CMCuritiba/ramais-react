import TipoRamal from '../models/TipoRamal';

class TipoRamalController {
  async index(req, res) {
    const tiposRamal = await TipoRamal.findAll({
      attributes: ['id', 'nome'],
    });

    return res.json(tiposRamal);
  }
}

export default new TipoRamalController();
