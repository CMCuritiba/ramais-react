import Sequelize, { Model } from 'sequelize';

class Setor extends Model {
  static init(sequelize) {
    super.init(
      {
        set_id: {
          type: Sequelize.INTEGER,
        },
      },
      {
        tableName: 'setores',
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

    this.belongsTo(models.VSetor, {
      foreignKey: 'set_id',
    });
  }
}

export default Setor;
