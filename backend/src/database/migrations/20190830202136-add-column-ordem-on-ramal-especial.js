module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ramais_especiais', 'ordem', {
      type: Sequelize.INTEGER,
      default: 1,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('ramais_especiais', 'ordem');
  },
};
