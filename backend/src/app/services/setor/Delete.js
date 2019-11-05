import Setor from '../../models/Setor';

class Delete {
  async run({ id }) {
    const setor = await Setor.findByPk(id);

    if (!setor) {
      throw new Error('400:Setor não encontrado');
    }

    await setor.destroy();

    return { message: 'Setor deletado com sucesso' };
  }
}
export default new Delete();
