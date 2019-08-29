import Sequelize, { Model } from 'sequelize';

class VFuncionario extends Model {
  static init(sequelize) {
    super.init(
      {
        pessoa: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        pes_nome: Sequelize.STRING,
        set_id: Sequelize.INTEGER,
      },
      {
        tableName: 'v_cmcfuncionarios',
        sequelize,
        freezeTableName: true,
        timestamps: false,
      }
    );

    return this;
  }
}

export default VFuncionario;
