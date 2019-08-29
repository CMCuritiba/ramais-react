import Sequelize, { Model } from 'sequelize';

class Localizacao extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        tableName: 'localizacoes',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Pavimento, {
      foreignKey: 'localizacao_id',
      sourceKey: 'id',
    });
  }
}

export default Localizacao;
