import Sequelize, { Model } from 'sequelize';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        nome: Sequelize.STRING,
        elotech_id: Sequelize.INTEGER,
        email: Sequelize.STRING,
        is_admin: Sequelize.BOOLEAN,
      },
      {
        tableName: 'usuarios',
        sequelize,
      }
    );

    return this;
  }
}

export default Usuario;
