import Sequelize from 'sequelize';

import TipoRamal from '../app/models/TipoRamal';
import Localizacao from '../app/models/Localizacao';
import Pavimento from '../app/models/Pavimento';
import Ramal from '../app/models/Ramal';
import VSetor from '../app/models/VSetor';
import Setor from '../app/models/Setor';

import databaseConfig from '../config/database';

const models = [TipoRamal, Localizacao, Pavimento, Ramal, VSetor, Setor];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Test the connection
    // this.connection.authenticate();

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
