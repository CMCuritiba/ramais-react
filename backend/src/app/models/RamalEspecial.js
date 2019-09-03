import Sequelize, { Model } from 'sequelize';

class RamalEspecial extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        numero: {
          type: Sequelize.INTEGER,
        },
        visivel: Sequelize.BOOLEAN,
        ordem: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
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
