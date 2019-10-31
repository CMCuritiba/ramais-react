import faker from 'faker';
import { factory } from 'factory-girl';

import Usuario from '../../src/app/models/Usuario';
import TipoRamal from '../../src/app/models/TipoRamal';

factory.define('Usuario', Usuario, {
  username: faker.internet.userName(),
  nome: faker.name.findName(),
  email: faker.internet.email(),
  elotech_id: 1122,
  is_admin: false,
});

factory.define('TipoRamal', TipoRamal, {
  nome: 'GERAL',
});

export default factory;
