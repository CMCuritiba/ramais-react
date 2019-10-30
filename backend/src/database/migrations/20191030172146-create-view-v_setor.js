const view_name = 'v_setor';
const view_sql =
  "SELECT t.a_set_codigo::integer AS id, t.a_set_nome AS set_nome,t.a_set_sigla AS set_sigla,t.a_set_inativacao AS set_inativacao,t.a_set_codigo_superior::integer AS set_id_superior,CASE WHEN t.set_ativo = 0 THEN false WHEN t.set_ativo = 1 THEN true ELSE NULL::boolean END AS set_ativo, CASE WHEN t.a_set_nome::text ~~ 'Gab%'::text OR t.a_set_nome::text ~~ 'Bloco%'::text THEN 'G'::text WHEN t.a_set_codigo::integer = ANY (ARRAY[146, 153]) THEN 'F'::text ELSE 'N'::text END AS set_tipo FROM dblink('hostaddr=10.0.0.67 dbname=elotech user=spa password=123camara'::text, 'select a_set_codigo,a_set_nome,a_set_sigla,a_set_inativacao,a_set_codigo_superior,set_ativo from aise.v_setor where set_ativo=1'::text) t(a_set_codigo character varying, a_set_nome character varying, a_set_sigla character varying, a_set_inativacao date, a_set_codigo_superior character varying, set_ativo integer)";

module.exports = {
  up: queryInterface => {
    return queryInterface.sequelize.query(
      `CREATE VIEW ${view_name} AS ${view_sql}`
    );
  },

  down: queryInterface => {
    return queryInterface.sequelize.query(`DROP VIEW ${view_name}`);
  },
};
