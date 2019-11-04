import Pavimento from '../../models/Pavimento';

class Delete {
  async run({ id }) {
    const pavimento = await Pavimento.findByPk(id);

    if (!pavimento) {
      throw new Error('400:Pavimento não encontrado');
    }

    await pavimento.destroy();

    return { message: 'Pavimento excluído com sucesso.' };
  }
}

export default new Delete();
