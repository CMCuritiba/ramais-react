import faker from 'faker';
import { factory } from 'factory-girl';

import Usuario from '../../src/app/models/Usuario';
import TipoRamal from '../../src/app/models/TipoRamal';
import Localizacao from '../../src/app/models/Localizacao';
import Pavimento from '../../src/app/models/Pavimento';
import Setor from '../../src/app/models/Setor';
import RamalEspecial from '../../src/app/models/RamalEspecial';
import VSetor from '../../src/app/models/VSetor';
import VFuncionario from '../../src/app/models/VFuncionario';

factory.define('VSetor', VSetor, {
  set_nome: 'Divisão de Gambiarras',
  set_sigla: 'DG',
  set_ativo: true,
});

factory.define('VFuncionario', VFuncionario, {
  matricula: faker.random.number,
  pessoa: faker.random.number,
  pes_nome: faker.name.findName,
  funcao: null,
  set_id: factory.assoc('VSetor'),
});

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
  set_id: factory.assoc('VSetor', 'id'),
  localizacao_id: factory.assoc('Localizacao', 'id'),
  pavimento_id: factory.assoc('Pavimento', 'id'),
});

factory.define('RamalEspecial', RamalEspecial, {
  nome: 'Portaria',
  numero: faker.random.number,
  visivel: true,
  ordem: 1,
  localizacao_id: factory.assoc('Localizacao', 'id'),
  pavimento_id: factory.assoc('Pavimento', 'id'),
});

factory.define('Ramal', RamalEspecial, {
  numero: faker.random.number,
  visivel: true,
  setor_id: factory.assoc('Setor', 'id'),
  tipo_ramal_id: factory.assoc('TipoRamal', 'id'),
});

export default factory;
