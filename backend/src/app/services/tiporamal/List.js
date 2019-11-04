import paginate from '../../helpers/paginate';
import TipoRamal from '../../models/TipoRamal';

class List {
  async run({ _page = 1 }) {
    const pageSize = 10;

    const tiposRamal = await TipoRamal.findAndCountAll(
      paginate(
        {
          attributes: ['id', 'nome'],
        },
        { page: _page, pageSize }
      )
    );

    return { count: tiposRamal.count, data: tiposRamal.rows };
  }
}

export default new List();
