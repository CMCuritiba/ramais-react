import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../../src/app';
import factory from '../util/factories';
import truncate from '../util/truncate';

import authConfig from '../../src/config/auth';
import TipoRamal from '../../src/app/models/TipoRamal';

const user = {
  userId: 1,
  userName: 'Zaca',
};

const token = jwt.sign(user, authConfig.secret, {
  expiresIn: authConfig.expiresIn,
});

describe('TipoRamal', () => {
  beforeEach(async () => {
    await truncate();
  });

  /**
   * deve retornar a lista de tipos de ramais cadastrados
   */
  it('deve retornar a lista de tipos de ramais cadastrados', async () => {
    await TipoRamal.create({ nome: 'GERAL' });
    await TipoRamal.create({ nome: 'CHEFIA' });

    const response = await request(app).get('/tipos-ramal');
    const { count, data } = response.body;

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');

    expect(count).toBe(2);
    expect(data[0].nome).toBe('GERAL');
    expect(typeof data[0].id).toBe('number');
  });

  /**
   * deve incluir um tipo de ramal
   */
  it('deve incluir um tipo de ramal', async () => {
    const tipoRamal = await factory.attrs('TipoRamal');

    const response = await request(app)
      .post('/tipos-ramal')
      .set('authorization', `Token: ${token}`)
      .send(tipoRamal);

    const { nome } = response.body;
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(nome).toBe('GERAL');
  });

  /**
   * deve gerar erro nome em branco ao incluir
   */
  it('deve gerar erro nome em branco ao incluir', async () => {
    const tipoRamal = { nome: null };

    const response = await request(app)
      .post('/tipos-ramal')
      .set('authorization', `Token: ${token}`)
      .send(tipoRamal);

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao incluir sem autorização
   */
  it('deve gerar erro ao incluir sem autorização', async () => {
    const tipoRamal = { nome: null };

    const response = await request(app)
      .post('/tipos-ramal')
      .send(tipoRamal);

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
  });

  /**
   * deve alterar um tipo de ramal
   */
  it('deve alterar um tipo de ramal', async () => {
    const tipoRamal = await TipoRamal.create({ id: 1, nome: 'GERAL' });

    const response = await request(app)
      .put('/tipos-ramal/1')
      .set('authorization', `Token: ${token}`)
      .send({ nome: 'GERAL ALTERADO' });

    const { nome } = response.body;
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(nome).toBe('GERAL ALTERADO');
  });

  /**
   * deve gerar erro nome em branco ao alterar
   */
  it('deve gerar erro nome em branco ao alterar', async () => {
    const tipoRamal = await TipoRamal.create({ id: 1, nome: 'GERAL' });

    const response = await request(app)
      .put('/tipos-ramal/1')
      .set('authorization', `Token: ${token}`)
      .send({ nome: null });

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao alterar sem autorização
   */
  it('deve gerar erro ao alterar sem autorização', async () => {
    const tipoRamal = await TipoRamal.create({ id: 1, nome: 'GERAL' });

    const response = await request(app)
      .put('/tipos-ramal/1')
      .send({ nome: null });

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
  });

  /**
   * deve gerar erro alterar com id inválida
   */
  it('deve gerar erro alterar com id inválida', async () => {
    const tipoRamal = await TipoRamal.create({ nome: 'GERAL' });

    const response = await request(app)
      .put('/tipos-ramal/999')
      .set('authorization', `Token: ${token}`)
      .send({ nome: null });

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve deletar um tipo de ramal
   */
  it('deve deletar um tipo de ramal', async () => {
    const tipoRamal = await TipoRamal.create({ nome: 'GERAL' });
    const ramal = await TipoRamal.findOne({ nome: 'GERAL' });

    const response = await request(app)
      .delete(`/tipos-ramal/${ramal.id}`)
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.status).toBe(200);
  });

  /**
   * deve gerar erro ao deletar um tipo de ramal com id inválida
   */
  it('deve gerar erro ao deletar um tipo de ramal com id inválida', async () => {
    const tipoRamal = await TipoRamal.create({ nome: 'GERAL' });

    const response = await request(app)
      .delete('/tipos-ramal/999')
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao deletar um tipo de ramal sem autorização
   */
  it('deve gerar erro ao deletar um tipo de ramal sem autorização', async () => {
    const tipoRamal = await TipoRamal.create({ nome: 'GERAL' });
    const ramal = await TipoRamal.findOne({ nome: 'GERAL' });

    const response = await request(app)
      .delete(`/tipos-ramal/${ramal.id}`)
      .send();

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
  });
});
