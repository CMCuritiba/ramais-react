import VSetor from '../models/VSetor';

class VSetorController {
  async index(req, res) {
    const setores = await VSetor.findAll({
      attributes: ['id', 'set_nome'],
      order: ['id'],
    });

    return res.json(setores);
  }
}

export default new VSetorController();
