module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ramais', 'setor_id', {
      type: Sequelize.INTEGER,
      references: { model: 'setores', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('ramais', 'setor_id');
  },
};
