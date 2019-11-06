import Setor from '../../models/Setor';
import VSetor from '../../models/VSetor';
import Localizacao from '../../models/Localizacao';
import Pavimento from '../../models/Pavimento';
import paginate from '../../helpers/paginate';

class List {
  async run({ _page }) {
    const pageSize = 10;

    const setores = await Setor.findAndCountAll(
      paginate(
        {
          attributes: ['id', 'set_id'],
          include: [
            {
              model: VSetor,
              attributes: ['id', 'set_nome'],
            },
            {
              model: Localizacao,
              attributes: ['id', 'nome'],
            },
            {
              model: Pavimento,
              attributes: ['id', 'nome'],
            },
          ],
          order: [[VSetor, 'id']],
        },
        { page: _page, pageSize }
      )
    );

    return setores;
  }
}

export default new List();
