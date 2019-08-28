module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ramais', 'setor_id', {
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('ramais', 'setor_id');
  },
};
