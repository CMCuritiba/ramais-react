import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';
// import Ramal from '../models/Ramal';
// import TipoRamal from '../models/TipoRamal';
// import Setor from '../models/Setor';
// import VSetor from '../models/VSetor';

class LocalizacaoController {
  async index(req, res) {
    const localizacoes = await Localizacao.findAll({
      order: ['nome'],
      attributes: ['id', 'nome'],
      include: [
        {
          model: Pavimento,
          attributes: ['id', 'nome'],
        },
      ],
    });

    // const setores = await Setor.findAll({
    //   attributes: ['id'],
    //   include: [
    //     {
    //       model: Localizacao,
    //       attributes: ['id', 'nome'],
    //     },
    //     {
    //       model: Pavimento,
    //       attributes: ['id', 'nome'],
    //     },
    //     {
    //       model: VSetor,
    //       attributes: ['id', 'set_nome'],
    //     },
    //   ],
    // });

    // const ramais = await Ramal.findAll({
    //   attributes: ['id', 'numero'],
    //   include: [
    //     {
    //       model: TipoRamal,
    //       attributes: ['nome'],
    //     },
    //   ],
    // });

    // const setores = await Setor.findAll({
    //   where: { set_ativo: true },
    //   attributes: ['set_id', 'set_nome'],
    //   order: ['set_nome'],
    // });

    return res.json(localizacoes);
    // return res.json(setores);
  }
}

export default new LocalizacaoController();
