import Sequelize, { Model } from 'sequelize';

class Pavimento extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        tableName: 'pavimentos',
        sequelize,
      }
    );

    return this;
  }
}

export default Pavimento;
