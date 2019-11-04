import Localizacao from '../../models/Localizacao';

class Update {
  async run({ id, nome }) {
    const localizacao = await Localizacao.findByPk(id);

    if (!localizacao) {
      throw new Error('400:Localização não encontrada');
    }

    await localizacao.update({ nome });

    return {
      id: localizacao.id,
      nome: localizacao.nome,
    };
  }
}

export default new Update();
