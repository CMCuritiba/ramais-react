import TipoRamal from '../../models/TipoRamal';
import Setor from '../../models/Setor';
import Ramal from '../../models/Ramal';

class Create {
  async run({ tipo_ramal_id, setor_id, numero, visivel }) {
    /**
     * Verifica tipo ramal
     */
    const tipoRamal = await TipoRamal.findByPk(tipo_ramal_id);

    if (!tipoRamal) {
      throw new Error('400:Tipo de Ramal não é válido');
    }

    /**
     * Verifica setor
     */
    const setor = await Setor.findByPk(setor_id);

    if (!setor) {
      throw new Error('400:Setor não é válido');
    }

    try {
      const { id } = await Ramal.create({
        tipo_ramal_id,
        setor_id,
        numero,
        visivel,
      });

      return {
        id,
        numero,
        visivel,
        tipo_ramal_id,
        setor_id,
      };
    } catch (err) {
      throw new Error('400:Ramal já cadastrado');
    }
  }
}

export default new Create();
