import TipoRamal from '../../models/TipoRamal';

class Update {
  async run({ id, nome }) {
    if (!id) {
      throw new Error('400:Parâmetro ID não fornecido');
    }

    const tipoRamal = await TipoRamal.findByPk(id);

    if (!tipoRamal) {
      throw new Error('400:Tipo Ramal não encontrado.');
    }

    try {
      await tipoRamal.update({ nome });
      return {
        id,
        nome,
      };
    } catch (err) {
      throw new Error(`500:${err}`);
    }
  }
}

export default new Update();
