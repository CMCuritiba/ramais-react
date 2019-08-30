import Sequelize, { Model } from 'sequelize';

class RamalEspecial extends Model {
  static init(sequelize) {
    super.init(
      {
        numero: Sequelize.INTEGER,
        visivel: Sequelize.BOOLEAN,
        localizacao_id: Sequelize.INTEGER,
      },
      {
        tableName: 'ramais_especiais',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Localizacao, {
      foreignKey: 'localizacao_id',
    });

    this.belongsTo(models.Pavimento, {
      foreignKey: 'pavimento_id',
    });
  }
}

export default RamalEspecial;
