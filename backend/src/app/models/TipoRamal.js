import Sequelize, { Model } from 'sequelize';

class TipoRamal extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        tableName: 'tipos_ramal',
        sequelize,
      }
    );

    return this;
  }
}

export default TipoRamal;
