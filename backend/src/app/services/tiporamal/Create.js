import TipoRamal from '../../models/TipoRamal';

class Create {
  async run({ nome }) {
    const tipoRamal = await TipoRamal.create({ nome });
    return {
      id: tipoRamal.id,
      nome: tipoRamal.nome,
    };
  }
}
export default new Create();
