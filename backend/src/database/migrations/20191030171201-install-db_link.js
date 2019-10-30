module.exports = {
  up: queryInterface => {
    return queryInterface.sequelize.query('CREATE EXTENSION dblink');
  },

  down: queryInterface => {
    return queryInterface.sequelize.query('DROP EXTENSION dblink');
  },
};
