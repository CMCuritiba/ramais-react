import Localizacao from '../../models/Localizacao';
import Pavimento from '../../models/Pavimento';
import RamalEspecial from '../../models/RamalEspecial';

class Update {
  async run({
    id,
    localizacao_id,
    pavimento_id,
    nome,
    numero,
    visivel,
    ordem,
  }) {
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

    const ramal = await RamalEspecial.findByPk(id);

    if (!ramal) {
      throw new Error('400:Ramal Especial não encontrado');
    }

    try {
      await ramal.update({
        id,
        localizacao_id,
        pavimento_id,
        nome,
        numero,
        visivel,
        ordem,
      });

      return {
        id,
        nome,
        numero,
        visivel,
        ordem,
        localizacao_id,
        pavimento_id,
      };
    } catch (err) {
      throw new Error('400:Ramal Especial já cadastrado');
    }
  }
}

export default new Update();
