import faker from 'faker';
import { factory } from 'factory-girl';

import Usuario from '../../src/app/models/Usuario';
import TipoRamal from '../../src/app/models/TipoRamal';
import Localizacao from '../../src/app/models/Localizacao';
import Pavimento from '../../src/app/models/Pavimento';
import Setor from '../../src/app/models/Setor';
import RamalEspecial from '../../src/app/models/RamalEspecial';

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

factory.define('Localizacao', Localizacao, {
  nome: 'ANEXO I',
});

factory.define('Pavimento', Pavimento, {
  nome: 'I ANDAR',
  localizacao_id: factory.assoc('Localizacao', 'id'),
});

factory.define('Setor', Setor, {
  set_id: 171,
  localizacao_id: factory.assoc('Localizacao', 'id'),
  pavimento_id: factory.assoc('Pavimento', 'id'),
});

factory.define('RamalEspecial', RamalEspecial, {
  nome: 'Portaria',
  numero: faker.random.number,
  visivel: true,
  order: 1,
  localizacao_id: factory.assoc('Localizacao', 'id'),
  pavimento_id: factory.assoc('Pavimento', 'id'),
});

export default factory;
