const view_name = 'v_cmcfuncionarios';
const view_sql =
  "SELECT t.matricula, t.pessoa, t.pes_nome, t.funcao, t.set_id, t.ind_estagiario FROM dblink('hostaddr=10.0.0.67 dbname=elotech user=mscmcldap password=321camara'::text, 'SELECT pessoa, matricula, pes_nome, funcao, set_id, ind_estagiario FROM aise.v_cmcfuncionarios'::text) t(pessoa integer, matricula integer, pes_nome character varying, funcao integer, set_id integer, ind_estagiario integer)";
module.exports = {
  up: queryInterface => {
    if (process.env.NODE_ENV !== 'test') {
      return queryInterface.sequelize.query(
        `CREATE VIEW ${view_name} AS ${view_sql}`
      );
    }
    return queryInterface.sequelize.query(
      'CREATE TABLE v_cmcfuncionarios(matricula INTEGER, pessoa INTEGER, pes_nome TEXT, funcao INTEGER, set_id INTEGER)'
    );
  },

  down: queryInterface => {
    if (process.env.NODE_ENV !== 'test') {
      return queryInterface.sequelize.query(`DROP VIEW ${view_name}`);
    }
    return queryInterface.sequelize.query('DROP TABLE v_cmcfuncionarios');
  },
};
