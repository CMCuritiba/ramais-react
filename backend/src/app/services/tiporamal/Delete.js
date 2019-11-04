import TipoRamal from '../../models/TipoRamal';

class Delete {
  async run({ id }) {
    if (!id) {
      throw new Error('400:Parâmetro ID não fornecido');
    }

    const tipoRamal = await TipoRamal.findByPk(id);

    if (!tipoRamal) {
      throw new Error('400:Tipo Ramal não encontrado.');
    }

    await tipoRamal.destroy();

    return { message: 'Tipo Ramal deletado com sucesso.' };
  }
}

export default new Delete();
