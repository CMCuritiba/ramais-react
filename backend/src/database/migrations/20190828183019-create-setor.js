module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('setores', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      localizacao_id: {
        type: Sequelize.INTEGER,
        references: { model: 'localizacoes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      pavimento_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pavimentos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('setores');
  },
};
