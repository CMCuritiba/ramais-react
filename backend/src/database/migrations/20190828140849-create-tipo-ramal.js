module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tipos_ramal', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tipos_ramal');
  },
};
