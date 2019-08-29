import Sequelize, { Model } from 'sequelize';

class Ramal extends Model {
  static init(sequelize) {
    super.init(
      {
        numero: Sequelize.INTEGER,
        visivel: Sequelize.BOOLEAN,
      },
      {
        tableName: 'ramais',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.TipoRamal, {
      foreignKey: 'tipo_ramal_id',
    });
  }
}

export default Ramal;
