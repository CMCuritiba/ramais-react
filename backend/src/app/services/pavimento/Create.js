import Localizacao from '../../models/Localizacao';
import Pavimento from '../../models/Pavimento';

class Create {
  async run({ localizacao_id, nome }) {
    /**
     * Verifica se localização é válida
     */

    if (!(await Localizacao.findByPk(localizacao_id))) {
      throw new Error('400:Localização inválida.');
    }

    const { id } = await Pavimento.create({ localizacao_id, nome });

    return {
      id,
      nome,
      localizacao_id,
    };
  }
}

export default new Create();
