import Localizacao from '../../models/Localizacao';
import Pavimento from '../../models/Pavimento';

class Update {
  async run({ id, localizacao_id, nome }) {
    /**
     * Verifica se localização é válida
     */
    if (!(await Localizacao.findByPk(localizacao_id))) {
      throw new Error('400:Localizacao inválida');
    }

    /**
     * Verifica se pavimento é válido
     */
    const pavimento = await Pavimento.findByPk(id);
    if (!pavimento) {
      throw new Error('400:Pavimento não encontrado.');
    }

    await pavimento.update({ id, localizacao_id, nome });

    return pavimento;
  }
}
export default new Update();
