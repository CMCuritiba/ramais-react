import Sequelize, { Model } from 'sequelize';

class VSetor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        set_nome: Sequelize.STRING,
      },
      {
        tableName: 'v_setor',
        sequelize,
        freezeTableName: true,
        timestamps: false,
      }
    );

    return this;
  }
}

export default VSetor;
