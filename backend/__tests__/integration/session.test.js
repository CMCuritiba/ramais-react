import request from 'supertest';
import sinon from 'sinon';
import passport from 'passport';

import app from '../../src/app';
import truncate from '../util/truncate';
import Usuario from '../../src/app/models/Usuario';
import CreateSessionService from '../../src/app/services/CreateSessionService';

describe('Session', () => {
  const runSpy = sinon.spy(CreateSessionService, 'run');
  let stubValidate;

  beforeAll(() => {
    stubValidate = sinon
      .stub(passport, 'authenticate')
      .callsFake(async (strategy, options, callback) => {
        await options(
          null,
          {
            uid: 'zaca',
            cn: 'Zaca Sabonete',
            employeeNumber: 1111,
            mail: 'zaca@cmc.br',
          },
          null
        );
      });
  });

  beforeEach(async () => {
    await truncate();
  });

  /**
   * deve logar com sucesso e não receber o token
   */
  it('deve logar com sucesso e não receber o token', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ username: 'zaca', password: '123456' });

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('token');
  });

  /**
   * deve logar com sucesso e receber token, pois é admin
   */
  it('deve logar com sucesso e receber token, pois é admin', async () => {
    await Usuario.create({
      username: 'zaca',
      nome: 'Zaca Sabonete',
      elotech_id: 1111,
      email: 'zaca@cmc.br',
      is_admin: true,
    });

    const response = await request(app)
      .post('/sessions')
      .send({ username: 'zaca', password: '123456' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  /**
   * deve dar erro de validação
   */
  it('deve dar erro de validação', async () => {
    stubValidate.restore();
    sinon
      .stub(passport, 'authenticate')
      .callsFake(async (strategy, options, callback) => {
        await options(null, null, 'Not authorized');
      });

    const response = await request(app)
      .post('/sessions')
      .send({ username: 'zaca', password: '123456' });

    expect(response.status).toBe(401);
  });

  /**
   * deve dar erro de geral
   */
  it('deve dar erro geral', async () => {
    stubValidate.restore();
    sinon
      .stub(passport, 'authenticate')
      .callsFake(async (strategy, options, callback) => {
        await options('Internal error', null, null);
      });

    const response = await request(app)
      .post('/sessions')
      .send({ username: 'zaca', password: '123456' });

    expect(response.status).toBe(500);
  });
});
