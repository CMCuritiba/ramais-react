module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ramais', 'tipo_ramal_id', {
      type: Sequelize.INTEGER,
      references: { model: 'tipos_ramal', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('ramais', 'tipo_ramal_id');
  },
};
