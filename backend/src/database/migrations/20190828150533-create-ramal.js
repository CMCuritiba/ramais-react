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
        unique: true,
      },
      visivel: {
        type: Sequelize.BOOLEAN,
        default: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('ramais');
  },
};
