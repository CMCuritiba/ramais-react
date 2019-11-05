import RamalEspecial from '../../models/RamalEspecial';

class Delete {
  async run({ id }) {
    const ramal = await RamalEspecial.findByPk(id);

    if (!ramal) {
      throw new Error('400:Ramal Especial não encontrado');
    }

    await ramal.destroy();

    return { message: 'Ramal Especial excluído com sucesso' };
  }
}

export default new Delete();
