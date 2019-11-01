import request from 'supertest';
import sinon from 'sinon';
import passport from 'passport';

import app from '../../src/app';
import truncate from '../util/truncate';
import Usuario from '../../src/app/models/Usuario';

describe('Session', () => {
  beforeAll(() => {
    let passportStub = sinon
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
   * deve retornar a lista de tipos de ramais cadastrados
   */
  it('deve logar com sucesso e não receber o token', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ username: 'zaca', password: '123456' });

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('token');
  });

  /**
   * deve retornar a lista de tipos de ramais cadastrados
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
});
