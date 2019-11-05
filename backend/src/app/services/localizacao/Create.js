import Localizacao from '../../models/Localizacao';

class Create {
  async run({ nome }) {
    const localizacao = await Localizacao.create({ nome });

    return {
      id: localizacao.id,
      nome: localizacao.nome,
    };
  }
}

export default new Create();
