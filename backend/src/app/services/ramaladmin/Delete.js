import Ramal from '../../models/Ramal';

class Delete {
  async run({ id }) {
    const ramal = await Ramal.findByPk(id);

    if (!ramal) {
      throw new Error('400:Ramal não encontrado');
    }

    await ramal.destroy();

    return { message: 'Ramal excluído com sucesso' };
  }
}
export default new Delete();
