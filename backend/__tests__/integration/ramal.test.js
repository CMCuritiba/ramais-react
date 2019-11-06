import request from 'supertest';
import VFuncionario from '../../src/app/models/VFuncionario';
import VSetor from '../../src/app/models/VSetor';
import Ramal from '../../src/app/models/Ramal';
import Setor from '../../src/app/models/Setor';
import Localizacao from '../../src/app/models/Localizacao';
import Pavimento from '../../src/app/models/Pavimento';
import TipoRamal from '../../src/app/models/TipoRamal';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Ramal', () => {
  const objEsperado = {
    id: expect.any(Number),
    nome: expect.any(String),
    localizacao: expect.any(String),
    pavimento: expect.any(String),
    funcionarios: expect.any(Array),
    ramais: expect.any(Array),
  };

  beforeEach(async () => {
    await truncate();
  });

  /**
   * deve retornar a lista de ramais
   */
  it('deve retornar a lista de ramais', async () => {
    const insere = async () => {
      const t = await TipoRamal.create({ nome: 'GERAL' });

      const l = await Localizacao.create({ nome: 'ANEXO I' });

      const p = await Pavimento.create({
        localizacao_id: l.id,
        nome: 'I ANDAR',
      });

      const vs = await VSetor.create({
        id: 171,
        set_nome: 'Divisão de Gambiarras',
      });

      const vf = await VFuncionario.create({
        matricula: 1111,
        pessoa: 2222,
        pes_nome: 'Zaca Sabonete',
        funcao: null,
        set_id: vs.id,
      });

      const s = await Setor.create({
        set_id: vs.id,
        localizacao_id: l.id,
        pavimento_id: p.id,
      });

      const r = await Ramal.create({
        numero: 4812,
        visivel: true,
        tipo_ramal_id: t.id,
        setor_id: s.id,
      });
    };

    await insere();

    const response = await request(app).get('/');

    const { count, data } = response.body;

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');

    expect(data[0]).toMatchObject(objEsperado);
  });
});
