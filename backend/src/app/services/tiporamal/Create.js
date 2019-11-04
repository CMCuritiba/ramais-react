import TipoRamal from '../../models/TipoRamal';

class Create {
  async run({ nome }) {
    try {
      const tipoRamal = await TipoRamal.create({ nome });
      return {
        id: tipoRamal.id,
        nome: tipoRamal.nome,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
export default new Create();
