import Localizacao from '../../models/Localizacao';

class Delete {
  async run({ id }) {
    const localizacao = await Localizacao.findByPk(id);

    if (!localizacao) {
      throw new Error('400:Localizacao não encontrada');
    }

    await localizacao.destroy();

    return { message: 'Localização excluída com sucesso.' };
  }
}

export default new Delete();
