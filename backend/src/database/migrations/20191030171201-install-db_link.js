module.exports = {
  up: queryInterface => {
    if (process.env.NODE_ENV !== 'test') {
      return queryInterface.sequelize.query('CREATE EXTENSION dblink');
    }
    return queryInterface.sequelize.query('SELECT 1');
  },

  down: queryInterface => {
    if (process.env.NODE_ENV !== 'test') {
      return queryInterface.sequelize.query('DROP EXTENSION dblink');
    }
    return queryInterface.sequelize.query('SELECT 1');
  },
};
