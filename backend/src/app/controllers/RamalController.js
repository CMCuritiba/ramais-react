import underscore from 'underscore';

import Ramal from '../models/Ramal';
import TipoRamal from '../models/TipoRamal';
import Setor from '../models/Setor';
import VSetor from '../models/VSetor';
import VFuncionario from '../models/VFuncionario';
import Localizacao from '../models/Localizacao';
import Pavimento from '../models/Pavimento';
import RamalValidator from '../validators/RamalValidator';

import paginate from '../helpers/paginate';

class RamalController {
  async index(req, res) {
    // const { pesquisa } = req.query;

    /**
     * Jeito mais sofisticado de fazer
     */
    // const setores = await Setor.findAll({
    //   attributes: ['id', 'set_id'],
    //   include: [
    //     {
    //       model: Localizacao,
    //       attributes: ['nome'],
    //     },
    //     {
    //       model: Pavimento,
    //       attributes: ['nome'],
    //     },
    //     {
    //       model: VSetor,
    //       attributes: ['set_nome'],
    //       include: [
    //         {
    //           model: VFuncionario,
    //           attributes: ['pes_nome', 'funcao'],
    //         },
    //       ],
    //       order: [[['pes_nome']]],
    //     },
    //     {
    //       model: Ramal,
    //       attributes: ['numero'],
    //       include: [
    //         {
    //           model: TipoRamal,
    //           attributes: ['nome'],
    //         },
    //       ],
    //     },
    //   ],
    // });

    // return res.json(setores);

    /**
     * Jeito mais manual de fazer
     */

    const { _page } = req.query;
    const pageSize = 4;

    const retorno = [];
    let total = 0;

    Setor.findAndCountAll(
      paginate(
        {
          attributes: ['id', 'set_id'],
          order: ['set_id'],
          include: [
            {
              model: Localizacao,
              attributes: ['nome'],
            },
            {
              model: Pavimento,
              attributes: ['nome'],
            },
            {
              model: VSetor,
              attributes: ['set_nome'],
            },
          ],
        },
        { page: _page, pageSize }
      )
    )
      .then(setores => {
        total = setores.count;
        return Promise.all(
          setores.rows.map(async setor => {
            const rama = await Ramal.findAll({
              attributes: ['numero', 'tipo_ramal_id'],
              where: { setor_id: setor.id },
              include: [
                {
                  model: TipoRamal,
                  attributes: ['nome'],
                },
              ],
            });

            const ramais = [];

            rama.map(r => {
              return ramais.push({
                ramal: r.numero,
                tipo: r.TipoRamal.nome,
              });
            });

            const func = await VFuncionario.findAll({
              attributes: ['pes_nome', 'funcao'],
              where: { set_id: setor.set_id },
              order: ['pes_nome'],
            });

            const funcionarios = [];
            func.map(f => {
              const funcao = RamalController.defineFuncao(f.funcao);

              return funcionarios.push({
                funcionario: f.pes_nome,
                funcao,
              });
            });

            const no = {
              id: setor.set_id,
              nome: setor.VSetor.set_nome,
              localizacao: setor.Localizacao.nome,
              pavimento: setor.Pavimento.nome,
              funcionarios,
              ramais,
            };

            retorno.push(no);
          })
        );
      })
      .then(() => {
        const retornoOrdenado = underscore.sortBy(retorno, 'id');

        return res.json({ count: total, data: retornoOrdenado });
      });
  }

  async store(req, res) {
    const validator = new RamalValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    /**
     * Verifica tipo ramal
     */
    const { tipo_ramal_id } = req.body;

    const tipoRamal = await TipoRamal.findByPk(tipo_ramal_id);

    if (!tipoRamal) {
      return res.status(400).json({ error: 'Tipo de Ramal não é válido' });
    }

    /**
     * Verifica setor
     */
    const { setor_id } = req.body;

    const setor = await Setor.findByPk(setor_id);

    if (!setor) {
      return res.status(400).json({ error: 'Setor não é válido' });
    }

    try {
      const { id, numero, visivel } = await Ramal.create(req.body);

      return res.json({
        id,
        numero,
        visivel,
        tipo_ramal_id,
        setor_id,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Ramal já cadastrado' });
    }
  }

  async update(req, res) {
    const validator = new RamalValidator();

    /**
     * Validação de dados de entrada
     */
    if (!(await validator.validate(req))) {
      return res.status(400).json({ error: validator.errors });
    }

    /**
     * Verifica tipo ramal
     */
    const { tipo_ramal_id } = req.body;

    const tipoRamal = await TipoRamal.findByPk(tipo_ramal_id);

    if (!tipoRamal) {
      return res.status(400).json({ error: 'Tipo de Ramal não é válido' });
    }

    /**
     * Verifica setor
     */
    const { setor_id } = req.body;

    const setor = await Setor.findByPk(setor_id);

    if (!setor) {
      return res.status(400).json({ error: 'Setor não é válido' });
    }

    const ramal = await Ramal.findByPk(req.params.id);

    if (!ramal) {
      return res.status(400).json({ error: 'Ramal não encontrado' });
    }

    try {
      const { id, numero, visivel } = await ramal.update(req.body);
      return res.json({
        id,
        numero,
        visivel,
        tipo_ramal_id,
        setor_id,
      });
    } catch (err) {
      return res.status(400).json({ error: 'Ramal já cadastrado' });
    }
  }

  async delete(req, res) {
    const ramal = await Ramal.findByPk(req.params.id);

    if (!ramal) {
      return res.status(400).json({ error: 'Ramal não encontrado' });
    }

    await ramal.destroy();

    return res.send();
  }

  static defineFuncao(funcao) {
    switch (funcao) {
      case 163:
        funcao = 'DIRETOR';
        break;
      case 166:
        funcao = 'CHEFE';
        break;
      case 167:
        funcao = 'CHEFE';
        break;
      default:
        funcao = 'TORA';
        break;
    }
    return funcao;
  }
}

export default new RamalController();
