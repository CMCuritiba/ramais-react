import request from 'supertest';

import app from '../../src/app';
import factory from '../util/factories';
import token from '../util/token';
import truncate from '../util/truncate';

import Localizacao from '../../src/app/models/Localizacao';
import Pavimento from '../../src/app/models/Pavimento';
import Setor from '../../src/app/models/Setor';
import VSetor from '../../src/app/models/VSetor';

describe('Setor', () => {
  const insere = async () => {
    const localizacao = await Localizacao.findOne({
      where: { nome: 'Anexo I' },
    });

    const pavimento = await Pavimento.findOne({
      where: { nome: 'I Andar' },
    });

    await VSetor.create({
      id: 171,
      set_nome: 'Divisão de Gambiarras',
    });

    await VSetor.create({
      id: 172,
      set_nome: 'Divisão de Charchichos',
    });

    await Setor.create({
      localizacao_id: localizacao.id,
      pavimento_id: pavimento.id,
      set_id: 171,
    });

    await Setor.create({
      localizacao_id: localizacao.id,
      pavimento_id: pavimento.id,
      set_id: 172,
    });
  };

  // beforeAll(async () => {});

  beforeEach(async () => {
    await truncate();
    await Pavimento.create({ nome: 'I Andar' });
    await Localizacao.create({ nome: 'Anexo I' });
    await insere();
  });

  /**
   * deve retornar a lista de localizacoes cadastradas
   */
  it('deve retornar a lista de setores cadastrados', async () => {
    const objEsperado = {
      id: expect.any(Number),
      set_id: expect.any(Number),
      VSetor: {
        id: expect.any(Number),
        set_nome: expect.any(String),
      },
      Localizacao: {
        id: expect.any(Number),
        nome: expect.any(String),
      },
      Pavimento: {
        id: expect.any(Number),
        nome: expect.any(String),
      },
    };
    const response = await request(app).get('/setores');

    const { count, data } = response.body;

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');

    expect(count).toBe(2);
    expect(data[0].set_id).toBe(171);
    expect(typeof data[0].set_id).toBe('number');

    expect(data[0]).toMatchObject(objEsperado);
  });

  // /**
  //  * deve incluir um pavimento
  //  */
  // it('deve incluir um pavimento', async () => {
  //   const pavimento = await factory.attrs('Pavimento');

  //   const response = await request(app)
  //     .post('/pavimentos')
  //     .set('authorization', `Token: ${token}`)
  //     .send(pavimento);

  //   const { nome } = response.body;
  //   expect(response.body).toHaveProperty('id');
  //   expect(response.body).toHaveProperty('nome');
  //   expect(nome).toBe('I ANDAR');
  // });

  // /**
  //  * deve gerar erro nome em branco ao incluir
  //  */
  // it('deve gerar erro nome em branco ao incluir', async () => {
  //   const pavimento = { nome: null };

  //   const response = await request(app)
  //     .post('/pavimentos')
  //     .set('authorization', `Token: ${token}`)
  //     .send(pavimento);

  //   expect(response.body).toHaveProperty('error');
  //   expect(response.status).toBe(400);
  // });

  // /**
  //  * deve gerar erro nome em branco ao incluir
  //  */
  // it('deve gerar erro id localizacao nulo ao incluir', async () => {
  //   const pavimento = { localizacao_id: null };

  //   const response = await request(app)
  //     .post('/pavimentos')
  //     .set('authorization', `Token: ${token}`)
  //     .send(pavimento);

  //   expect(response.body).toHaveProperty('error');
  //   expect(response.status).toBe(400);
  // });

  // /**
  //  * deve gerar erro ao incluir sem autorização
  //  */
  // it('deve gerar erro ao incluir sem autorização', async () => {
  //   const pavimento = { nome: null };

  //   const response = await request(app)
  //     .post('/pavimentos')
  //     .send(pavimento);

  //   const { nome } = response.body;
  //   expect(response.body).toHaveProperty('error');
  //   expect(response.status).toBe(401);
  // });

  // /**
  //  * deve alterar um pavimento
  //  */
  // it('deve alterar um pavimento', async () => {
  //   const pavimento = await Pavimento.findOne({ where: { nome: 'I ANDAR' } });

  //   const response = await request(app)
  //     .put(`/pavimentos/${pavimento.id}`)
  //     .set('authorization', `Token: ${token}`)
  //     .send({
  //       localizacao_id: pavimento.localizacao_id,
  //       nome: 'I ANDAR ALTERADO',
  //     });

  //   const { nome } = response.body;
  //   expect(response.body).toHaveProperty('id');
  //   expect(response.body).toHaveProperty('nome');
  //   expect(nome).toBe('I ANDAR ALTERADO');
  // });

  // /**
  //  * deve gerar erro nome em branco ao alterar
  //  */
  // it('deve gerar erro nome em branco ao alterar', async () => {
  //   const pavimento = await factory.attrs('Pavimento');

  //   const response = await request(app)
  //     .put(`/pavimentos/${pavimento.id}`)
  //     .set('authorization', `Token: ${token}`)
  //     .send({ nome: null });

  //   expect(response.body).toHaveProperty('error');
  //   expect(response.status).toBe(400);
  // });

  // /**
  //  * deve gerar erro ao alterar sem autorização
  //  */
  // it('deve gerar erro ao alterar sem autorização', async () => {
  //   const pavimento = factory.attrs('Pavimento');

  //   const response = await request(app).put(`/pavimentos/${pavimento.id}`);

  //   expect(response.body).toHaveProperty('error');
  //   expect(response.status).toBe(401);
  // });

  // /**
  //  * deve gerar erro alterar com id inválida
  //  */
  // it('deve gerar erro alterar com id inválida', async () => {
  //   const response = await request(app)
  //     .put('/localizacoes/999')
  //     .set('authorization', `Token: ${token}`);

  //   expect(response.body).toHaveProperty('error');
  //   expect(response.status).toBe(400);
  // });

  // /**
  //  * deve deletar um pavimento
  //  */
  // it('deve deletar um pavimento', async () => {
  //   const pavimento = await Pavimento.findOne({ where: { nome: 'I ANDAR' } });

  //   const response = await request(app)
  //     .delete(`/pavimentos/${pavimento.id}`)
  //     .set('authorization', `Token: ${token}`)
  //     .send();

  //   expect(response.status).toBe(200);

  //   const pavimentoDeletado = await Pavimento.findOne({
  //     where: { nome: 'I ANDAR' },
  //   });

  //   expect(pavimentoDeletado).toBe(null);
  // });

  // /**
  //  * deve gerar erro ao deletar um pavimento com id inválida
  //  */
  // it('deve gerar erro ao deletar um pavimento com id inválida', async () => {
  //   const response = await request(app)
  //     .delete('/pavimentos/999')
  //     .set('authorization', `Token: ${token}`)
  //     .send();

  //   expect(response.body).toHaveProperty('error');
  //   expect(response.status).toBe(400);
  // });

  // /**
  //  * deve gerar erro ao deletar um pavimento sem autorização
  //  */
  // it('deve gerar erro ao deletar um pavimento sem autorização', async () => {
  //   const pavimento = await Pavimento.findOne({ where: { nome: 'I ANDAR' } });

  //   const response = await request(app)
  //     .delete(`/pavimentos/${pavimento.id}`)
  //     .send();

  //   expect(response.body).toHaveProperty('error');
  //   expect(response.status).toBe(401);
  // });
});
