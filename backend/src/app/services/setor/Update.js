import Setor from '../../models/Setor';
import VSetor from '../../models/VSetor';
import Localizacao from '../../models/Localizacao';
import Pavimento from '../../models/Pavimento';

class Update {
  async run({ id, localizacao_id, pavimento_id, set_id }) {
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
     * Verifica id setor passado é válido
     */
    const setor = await Setor.findByPk(id);

    if (!setor) {
      throw new Error('400:Setor não encontrado');
    }

    /**
     * Verifica vsetor
     */
    const vSetor = await VSetor.findByPk(set_id);

    if (!vSetor) {
      throw new Error('400:Setor não é válido');
    }

    try {
      const setorAtualizado = await setor.update({
        localizacao_id,
        pavimento_id,
        set_id,
      });

      return setorAtualizado;
    } catch (err) {
      console.log(err);
      throw new Error('400:Setor já cadastrado');
    }
  }
}
export default new Update();
