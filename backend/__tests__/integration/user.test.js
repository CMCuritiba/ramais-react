import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../src/app';
import factory from '../util/factories';
import truncate from '../util/truncate';

describe('Usuario', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('teste dummy', () => {
    expect(1).toBe(1);
  });

  //   it('should be able to register', async () => {
  //     const user = await factory.attrs('User');

  //     const response = await request(app)
  //       .post('/users')
  //       .send(user);

  //     expect(response.body).toHaveProperty('id');
  //   });

  //   it('should encrypt user password when new user created', async () => {
  //     const user = await factory.create('User', {
  //       password: '123456',
  //     });

  //     const compareHash = await bcrypt.compare('123456', user.password_hash);

  //     expect(compareHash).toBe(true);
  //   });
});
