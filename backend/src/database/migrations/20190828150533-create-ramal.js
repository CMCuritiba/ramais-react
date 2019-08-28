module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ramais', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      visivel: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('ramais');
  },
};
