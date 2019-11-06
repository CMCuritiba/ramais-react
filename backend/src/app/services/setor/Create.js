import Setor from '../../models/Setor';
import VSetor from '../../models/VSetor';
import Localizacao from '../../models/Localizacao';
import Pavimento from '../../models/Pavimento';

class Create {
  async run({ localizacao_id, pavimento_id, set_id }) {
    /**
     * Verifica localizacao
     */

    const localizacao = await Localizacao.findByPk(localizacao_id);

    if (!localizacao) {
      throw new Error('400:Localização não é válida');
    }

    /**
     * Verifica pavimento
     */
    const pavimento = await Pavimento.findByPk(pavimento_id);

    if (!pavimento) {
      throw new Error('400:Pavimento não é válido');
    }

    /**
     * Verifica vsetor
     */
    const vSetor = await VSetor.findByPk(set_id);

    if (!vSetor) {
      throw new Error('400:Setor não é válido');
    }

    try {
      const setor = await Setor.create({
        localizacao_id,
        pavimento_id,
        set_id,
      });
      return setor;
    } catch (err) {
      throw new Error('400:Setor já cadastrado');
    }
  }
}

export default new Create();
