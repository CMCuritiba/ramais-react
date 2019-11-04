import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../../src/app';
import factory from '../util/factories';
import truncate from '../util/truncate';

import authConfig from '../../src/config/auth';
import Localizacao from '../../src/app/models/Localizacao';

const user = {
  userId: 1,
  userName: 'Zaca',
};

const token = jwt.sign(user, authConfig.secret, {
  expiresIn: authConfig.expiresIn,
});

describe('Localizacao', () => {
  beforeEach(async () => {
    await truncate();
  });

  /**
   * deve retornar a lista de localizacoes cadastradas
   */
  it('deve retornar a lista de localizacoes cadastradas', async () => {
    const insere = async () => {
      await Localizacao.create({ nome: 'ANEXO I' });
      await Localizacao.create({ nome: 'ANEXO II' });
    };

    await insere();

    const response = await request(app).get('/localizacoes');
    const { count, data } = response.body;

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('count');
    expect(response.body).toHaveProperty('data');

    expect(count).toBe(2);
    expect(data[0].nome).toBe('ANEXO I');
    expect(typeof data[0].id).toBe('number');
  });

  /**
   * deve incluir uma localizacao
   */
  it('deve incluir uma localizacao', async () => {
    const localizacao = await factory.attrs('Localizacao');

    const response = await request(app)
      .post('/localizacoes')
      .set('authorization', `Token: ${token}`)
      .send(localizacao);

    const { nome } = response.body;
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(nome).toBe('ANEXO I');
  });

  /**
   * deve gerar erro nome em branco ao incluir
   */
  it('deve gerar erro nome em branco ao incluir', async () => {
    const localizacao = { nome: null };

    const response = await request(app)
      .post('/localizacoes')
      .set('authorization', `Token: ${token}`)
      .send(localizacao);

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao incluir sem autorização
   */
  it('deve gerar erro ao incluir sem autorização', async () => {
    const localizacao = { nome: null };

    const response = await request(app)
      .post('/localizacoes')
      .send(localizacao);

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
  });

  /**
   * deve alterar uma localizacao
   */
  it('deve alterar uma localizacao', async () => {
    const localizacao = await Localizacao.create({ nome: 'ANEXO I' });

    const response = await request(app)
      .put(`/localizacoes/${localizacao.id}`)
      .set('authorization', `Token: ${token}`)
      .send({ nome: 'ANEXO I ALTERADO' });

    const { nome } = response.body;
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nome');
    expect(nome).toBe('ANEXO I ALTERADO');
  });

  /**
   * deve gerar erro nome em branco ao alterar
   */
  it('deve gerar erro nome em branco ao alterar', async () => {
    const tipoRamal = await Localizacao.create({ nome: 'ANEXO I' });

    const response = await request(app)
      .put('/localizacoes/1')
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
    const tipoRamal = await Localizacao.create({ nome: 'ANEXO I' });

    const response = await request(app)
      .put('/localizacoes/1')
      .send({ nome: null });

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
  });

  /**
   * deve gerar erro alterar com id inválida
   */
  it('deve gerar erro alterar com id inválida', async () => {
    const tipoRamal = await Localizacao.create({ nome: 'ANEXO I' });

    const response = await request(app)
      .put('/localizacoes/999')
      .set('authorization', `Token: ${token}`)
      .send({ nome: null });

    const { nome } = response.body;
    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve deletar uma localizacao
   */
  it('deve deletar uma', async () => {
    const localizacao = await Localizacao.create({ nome: 'ANEXO I' });

    const response = await request(app)
      .delete(`/localizacoes/${localizacao.id}`)
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.status).toBe(200);
  });

  /**
   * deve gerar erro ao deletar uma localizacao com id inválida
   */
  it('deve gerar erro ao deletar uma localizacao com id inválida', async () => {
    const localizacao = await Localizacao.create({ nome: 'ANEXO I' });

    const response = await request(app)
      .delete('/localizacoes/999')
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao deletar uma localizacao sem autorização
   */
  it('deve gerar erro ao deletar uma localizacao sem autorização', async () => {
    const localizacao = await Localizacao.create({ nome: 'ANEXO I' });

    const response = await request(app)
      .delete(`/localizacoes/${localizacao.id}`)
      .send();

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
  });
});
