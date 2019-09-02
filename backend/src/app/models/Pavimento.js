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

  static associate(models) {
    this.hasOne(models.Localizacao, {
      foreignKey: 'id',
      sourceKey: 'localizacao_id',
    });
  }
}

export default Pavimento;
