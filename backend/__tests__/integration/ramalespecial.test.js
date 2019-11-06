import request from 'supertest';

import app from '../../src/app';
import factory from '../util/factories';
import truncate from '../util/truncate';
import token from '../util/token';

import RamalEspecial from '../../src/app/models/RamalEspecial';

describe('RamalEspecial', () => {
  const objEsperado = {
    id: expect.any(Number),
    nome: expect.any(String),
    numero: expect.any(Number),
    visivel: expect.any(Boolean),
    ordem: expect.any(Number),
    Localizacao: {
      id: expect.any(Number),
      nome: expect.any(String),
    },
    Pavimento: {
      id: expect.any(Number),
      nome: expect.any(String),
    },
  };

  beforeEach(async () => {
    await truncate();
  });

  /**
   * deve retornar a lista de ramais especiais
   */
  it('deve retornar a lista de ramais especiais', async () => {
    const insere = async () => {
      const ramais = await factory
        .createMany('RamalEspecial', 5)
        .then(ramalArray => {
          return ramalArray;
        });
    };

    await insere();

    const response = await request(app).get('/ramais-especiais');

    const { count, data } = response.body;

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');

    expect(count).toBe(5);

    expect(data[0]).toMatchObject(objEsperado);
  });

  /**
   * deve incluir um ramal especial
   */
  it('deve incluir um ramal especial', async () => {
    const ramal = await factory.attrs('RamalEspecial');

    const response = await request(app)
      .post('/ramais-especiais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');

    const { nome } = response.body;
    expect(nome).toBe('Portaria');
  });

  /**
   * deve gerar erro nome em branco ao incluir
   */
  it('deve gerar erro nome em branco ao incluir', async () => {
    const ramal = await factory.attrs('RamalEspecial', { nome: null });

    const response = await request(app)
      .post('/ramais-especiais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro localizacao_id em branco ao incluir
   */
  it('deve gerar erro nome em branco ao incluir', async () => {
    const ramal = await factory.attrs('RamalEspecial', {
      localizacao_id: null,
    });

    const response = await request(app)
      .post('/ramais-especiais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro numero em branco ao incluir
   */
  it('deve gerar erro numero em branco ao incluir', async () => {
    const ramal = await factory.attrs('RamalEspecial', {
      numero: null,
    });

    const response = await request(app)
      .post('/ramais-especiais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro visivel em branco ao incluir
   */
  it('deve gerar erro visivel em branco ao incluir', async () => {
    const ramal = await factory.attrs('RamalEspecial', {
      visivel: null,
    });

    const response = await request(app)
      .post('/ramais-especiais')
      .set('authorization', `Token: ${token}`)
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao incluir sem autorização
   */
  it('deve gerar erro ao incluir sem autorização', async () => {
    const ramal = await factory.attrs('RamalEspecial');

    const response = await request(app)
      .post('/ramais-especiais')
      .send(ramal);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
  });

  /**
   * deve alterar um ramal especial
   */
  it('deve alterar um ramal especial', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais-especiais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        nome: 'Portaria Alterada',
      });

    const { nome } = response.body;
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(nome).toBe('Portaria Alterada');
  });

  /**
   * deve gerar erro nome em branco ao alterar
   */
  it('deve gerar erro nome em branco ao alterar', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais-especiais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        nome: null,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro localizacao_id em branco ao alterar
   */
  it('deve gerar erro localizacao_id em branco ao alterar', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais-especiais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        localizacao_id: null,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro pavimento_id em branco ao alterar
   */
  it('deve gerar erro pavimento_id em branco ao alterar', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais-especiais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        pavimento_id: null,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro numero em branco ao alterar
   */
  it('deve gerar erro numero em branco ao alterar', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais-especiais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        ...ramalInsere,
        numero: null,
      });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro visivel em branco ao alterar
   */
  it('deve gerar erro visivel em branco ao alterar', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais-especiais/${ramal.id}`)
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
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .put(`/ramais-especiais/${ramal.id}`)
      .send({ ...ramalInsere });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({ error: 'Token not provided' });
  });

  /**
   * deve gerar erro alterar com id inválida
   */
  it('deve gerar erro alterar com id inválida', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .put('/ramais-especiais/999')
      .set('authorization', `Token: ${token}`)
      .send({ ...ramalInsere });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({ error: 'Ramal Especial não encontrado' });
  });

  /**
   * deve deletar um ramal especial
   */
  it('deve deletar um ramal especial', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    const ramal = await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .delete(`/ramais-especiais/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.status).toBe(200);
  });

  /**
   * deve gerar erro ao deletar um ramal especial com id inválida
   */
  it('deve gerar erro ao deletar um ramal especial com id inválida', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .delete('/ramais-especiais/999')
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.status).toBe(400);

    expect(response.body).toEqual({ error: 'Ramal Especial não encontrado' });
  });

  /**
   * deve gerar erro ao deletar um ramal especial sem autorização
   */
  it('deve gerar erro ao deletar um ramal especial sem autorização', async () => {
    const ramalInsere = await factory.attrs('RamalEspecial');
    await RamalEspecial.create(ramalInsere);

    const response = await request(app)
      .delete('/ramais-especiais/999')
      .send();

    expect(response.status).toBe(401);

    expect(response.body).toEqual({ error: 'Token not provided' });
  });
});
