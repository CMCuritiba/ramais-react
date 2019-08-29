import Ramal from '../models/Ramal';
import TipoRamal from '../models/TipoRamal';
import Setor from '../models/Setor';
import VSetor from '../models/VSetor';
import VFuncionario from '../models/VFuncionario';

class RamalController {
  async index(req, res) {
    const { pesquisa } = req.query;

    const setores = await Setor.findAll({
      attributes: ['id', 'set_id'],
      include: [
        {
          model: VSetor,
          attributes: ['set_nome'],
          include: [
            {
              model: VFuncionario,
              attributes: ['pes_nome', 'funcao'],
            },
          ],
        },
        {
          model: Ramal,
          attributes: ['numero'],
          include: [
            {
              model: TipoRamal,
              attributes: ['nome'],
            },
          ],
        },
      ],
    });

    return res.json(setores);
  }
}

export default new RamalController();
