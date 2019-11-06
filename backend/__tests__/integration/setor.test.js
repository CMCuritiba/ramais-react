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

    await VSetor.create({
      id: 222,
      set_nome: 'Divisão de Sabonetismo',
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

  /**
   * deve incluir um setor
   */
  it('deve incluir um setor', async () => {
    const setor = await factory.attrs('Setor', { set_id: 222 });

    const response = await request(app)
      .post('/setores')
      .set('authorization', `Token: ${token}`)
      .send(setor);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('set_id');
  });

  /**
   * não deve deixar incluir um setor que não existe na view v_setor
   */
  it('não deve deixar incluir um setor que não existe na view v_setor', async () => {
    const setor = await factory.attrs('Setor', { set_id: 223 });

    const response = await request(app)
      .post('/setores')
      .set('authorization', `Token: ${token}`)
      .send(setor);

    expect(response.status).toBe(400);

    expect(response.body).toEqual({ error: 'Setor não é válido' });
  });

  /**
   * não deve deixar incluir um setor com set_id null
   */
  it('não deve deixar incluir um setor com set_id null', async () => {
    const setor = await factory.attrs('Setor', { set_id: null });

    const response = await request(app)
      .post('/setores')
      .set('authorization', `Token: ${token}`)
      .send(setor);

    expect(response.status).toBe(400);
  });

  /**
   * não deve deixar incluir um setor com localização inválida
   */
  it('não deve deixar incluir um setor com localização inválida', async () => {
    const setor = await factory.attrs('Setor', {
      set_id: 171,
      localizacao_id: 223,
    });

    const response = await request(app)
      .post('/setores')
      .set('authorization', `Token: ${token}`)
      .send(setor);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Localização não é válida' });
  });

  /**
   * não deve deixar incluir um setor com localização nula
   */
  it('não deve deixar incluir um setor com localização nula', async () => {
    const setor = await factory.attrs('Setor', { localizacao_id: null });

    const response = await request(app)
      .post('/setores')
      .set('authorization', `Token: ${token}`)
      .send(setor);

    expect(response.status).toBe(400);
  });

  /**
   * não deve deixar incluir um setor com pavimento inválido
   */
  it('não deve deixar incluir um setor com pavimento inválido', async () => {
    const setor = await factory.attrs('Setor', {
      set_id: 171,
      pavimento_id: 234,
    });

    const response = await request(app)
      .post('/setores')
      .set('authorization', `Token: ${token}`)
      .send(setor);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Pavimento não é válido' });
  });

  /**
   * não deve deixar incluir um setor com pavimento nulo
   */
  it('não deve deixar incluir um setor com pavimento nulo', async () => {
    const setor = await factory.attrs('Setor', { pavimento_id: 234 });

    const response = await request(app)
      .post('/setores')
      .set('authorization', `Token: ${token}`)
      .send(setor);

    expect(response.status).toBe(400);
  });

  /**
   * não deve deixar incluir um setor já cadastrado
   */
  it('não deve deixar incluir um setor já cadastrado', async () => {
    const setor = await factory.attrs('Setor', { set_id: 171 });

    const response = await request(app)
      .post('/setores')
      .set('authorization', `Token: ${token}`)
      .send(setor);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Setor já cadastrado' });
  });

  /**
   * deve gerar erro ao incluir sem autorização
   */
  it('deve gerar erro ao incluir sem autorização', async () => {
    const setor = await factory.attrs('Setor');

    const response = await request(app)
      .post('/setores')
      .send(setor);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Token not provided' });
  });

  /**
   * deve alterar um setor
   */
  it('deve alterar um setor', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .put(`/setores/${setor.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        localizacao_id: setor.localizacao_id,
        pavimento_id: setor.pavimento_id,
        set_id: '222',
      });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('localizacao_id');
    expect(response.body).toHaveProperty('pavimento_id');
  });

  /**
   * deve gerar erro ao alterar um setor com v_setor inválido
   */
  it('deve gerar erro ao alterar um setor com v_setor inválido', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .put(`/setores/${setor.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        localizacao_id: setor.localizacao_id,
        pavimento_id: setor.pavimento_id,
        set_id: '221',
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({ error: 'Setor não é válido' });
  });

  /**
   * deve gerar erro ao alterar um setor com localizacao inválida
   */
  it('deve gerar erro ao alterar um setor com localizacao inválida', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .put(`/setores/${setor.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        localizacao_id: 221,
        pavimento_id: setor.pavimento_id,
        set_id: setor.set_id,
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({ error: 'Localização não é válida' });
  });

  /**
   * deve gerar erro ao alterar um setor com pavimento inválido
   */
  it('deve gerar erro ao alterar um setor com pavimento inválido', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .put(`/setores/${setor.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        localizacao_id: setor.localizacao_id,
        pavimento_id: 221,
        set_id: setor.set_id,
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({ error: 'Pavimento não é válido' });
  });

  /**
   * deve gerar erro ao alterar um setor com v_setor nulo
   */
  it('deve gerar erro ao alterar um setor com v_setor nulo', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .put(`/setores/${setor.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        localizacao_id: setor.localizacao_id,
        pavimento_id: setor.pavimento_id,
        set_id: null,
      });

    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao alterar um setor com localizacao nula
   */
  it('deve gerar erro ao alterar um setor com localizacao nula', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .put(`/setores/${setor.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        localizacao_id: null,
        pavimento_id: setor.pavimento_id,
        set_id: setor.set_id,
      });

    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao alterar um setor com pavimento nulo
   */
  it('deve gerar erro ao alterar um setor com pavimento nulo', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .put(`/setores/${setor.id}`)
      .set('authorization', `Token: ${token}`)
      .send({
        localizacao_id: setor.localizacao_id,
        pavimento_id: null,
        set_id: setor.set_id,
      });

    expect(response.status).toBe(400);
  });

  /**
   * deve gerar erro ao alterar sem autorização
   */
  it('deve gerar erro ao alterar sem autorização', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .put(`/setores/${setor.id}`)
      .send({
        localizacao_id: setor.localizacao_id,
        pavimento_id: setor.pavimento_id,
        set_id: setor.set_id,
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Token not provided' });
  });

  /**
   * deve deletar um setor
   */
  it('deve deletar um setor', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .delete(`/setores/${setor.id}`)
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.status).toBe(200);

    const setorDeletado = await Setor.findOne({ where: { set_id: '171' } });

    expect(setorDeletado).toBe(null);
  });

  /**
   * deve gerar erro ao deletar um setor com id inválida
   */
  it('deve gerar erro ao deletar um setor com id inválida', async () => {
    const response = await request(app)
      .delete('/setores/999')
      .set('authorization', `Token: ${token}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Setor não encontrado' });
  });

  /**
   * deve gerar erro ao deletar um setor sem autorização
   */
  it('deve gerar erro ao deletar um setor sem autorização', async () => {
    const setor = await Setor.findOne({ where: { set_id: '171' } });

    const response = await request(app)
      .delete(`/setores/${setor.id}`)
      .send();

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Token not provided' });
  });
});
