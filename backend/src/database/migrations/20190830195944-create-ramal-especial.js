module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ramais_especiais', {
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
      localizacao_id: {
        type: Sequelize.INTEGER,
        references: { model: 'localizacoes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      pavimento_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pavimentos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      visivel: {
        type: Sequelize.BOOLEAN,
        default: true,
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
    return queryInterface.dropTable('ramais_especiais');
  },
};
