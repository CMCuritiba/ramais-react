module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('pavimentos', 'localizacao_id', {
      type: Sequelize.INTEGER,
      references: { model: 'localizacoes', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('pavimentos', 'localizacao_id');
  },
};
