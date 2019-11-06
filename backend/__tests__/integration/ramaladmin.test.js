import request from 'supertest';

import app from '../../src/app';
import factory from '../util/factories';
import truncate from '../util/truncate';
import token from '../util/token';

import Ramal from '../../src/app/models/Ramal';

describe('RamalAdmin', () => {
  const objEsperado = {
    id: expect.any(Number),
    numero: expect.any(Number),
    TipoRamal: expect.any(Object),
  };

  beforeEach(async () => {
    await truncate();
  });

  /**
   * deve retornar a lista de ramais
   */
  it('deve retornar a lista de ramais', async () => {
    const ramal = await factory.attrs('RamalAdmin');

    Ramal.create(ramal);

    const response = await request(app)
      .get('/ramais')
      .set('authorization', `Token: ${token}`);

    const { count, data } = response.body;

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');

    expect(count).toBe(1);

    expect(data[0]).toMatchObject(objEsperado);
  });

  /**
   * deve incluir um ramal
   */
  it('deve incluir um ramal', async () => {
    const ramal = await factory.attrs('RamalAdmin');

    const response = await request(app)
      .post('/ramais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('numero');

    const { numero } = response.body;
    expect(numero).toBe(1111);
  });

  /**
   * deve gerar erro numero em branco ao incluir
   */
  it('deve gerar erro numero em branco ao incluir', async () => {
    const ramal = await factory.attrs('RamalAdmin', { numero: null });

    const response = await request(app)
      .post('/ramais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro setor_id em branco ao incluir
   */
  it('deve gerar erro setor_id em branco ao incluir', async () => {
    const ramal = await factory.attrs('RamalAdmin', {
      setor_id: null,
    });

    const response = await request(app)
      .post('/ramais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro tipo ramal em branco ao incluir
   */
  it('deve gerar erro tipo ramal em branco ao incluir', async () => {
    const ramal = await factory.attrs('RamalAdmin', {
      tipo_ramal_id: null,
    });

    const response = await request(app)
      .post('/ramais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro visivel em branco ao incluir
   */
  it('deve gerar erro visivel em branco ao incluir', async () => {
    const ramal = await factory.attrs('RamalAdmin', {
      visivel: null,
    });

    const response = await request(app)
      .post('/ramais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao incluir sem autorização
   */
  it('deve gerar erro ao incluir sem autorização', async () => {
    const ramal = await factory.attrs('RamalAdmin');

    const response = await request(app)
      .post('/ramais')
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
  });

  /**
   * deve alterar um ramal
   */
  it('deve alterar um ramal', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        numero: 3333,
      });

    const { numero } = response.body;
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('numero');
    expect(numero).toBe(3333);
  });

  /**
   * deve gerar erro numero em branco ao alterar
   */
  it('deve gerar erro numero em branco ao alterar', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        numero: null,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro setor_id em branco ao alterar
   */
  it('deve gerar erro setor_id em branco ao alterar', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        setor_id: null,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro tipo ramal em branco ao alterar
   */
  it('deve gerar erro tipo ramal em branco ao alterar', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        tipo_ramal_id: null,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro alterar visivel nulo
   */
  it('deve gerar erro alterar visivel nulo', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        visivel: null,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao alterar sem autorização
   */
  it('deve gerar erro ao alterar sem autorização', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais/${ramal.id}`)
      .send({ ...ramalInsere });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({ error: 'Token not provided' });
  });

  /**
   * deve gerar erro alterar com id inválida
   */
  it('deve gerar erro alterar com id inválida', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .put('/ramais/999')
      .set('authorization', `Token: ${token}`)
      .send({ ...ramalInsere });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({ error: 'Ramal não encontrado' });
  });

  /**
   * deve deletar um ramal
   */
  it('deve deletar um ramal', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .delete(`/ramais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.status).toBe(200);
  });

  /**
   * deve gerar erro ao deletar um ramal com id inválida
   */
  it('deve gerar erro ao deletar um ramal com id inválida', async () => {
    const ramalInsere = await factory.attrs('RamalAdmin');
    await Ramal.create(ramalInsere);

    const response = await request(app)
      .delete('/ramais/999')
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.status).toBe(400);

    expect(response.body).toEqual({ error: 'Ramal não encontrado' });
  });

  /**
   * deve gerar erro ao deletar um ramal sem autorização
   */
  it('deve gerar erro ao deletar um ramal sem autorização', async () => {
    const ramalInsere = await factory.attrs('Ramal');
    const ramal = await Ramal.create(ramalInsere);

    const response = await request(app)
      .delete(`/ramais/${ramal.id}`)
      .send();

    expect(response.status).toBe(401);

    expect(response.body).toEqual({ error: 'Token not provided' });
  });
});
