module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('setores', 'setor_id', {
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('setores', 'setor_id');
  },
};
