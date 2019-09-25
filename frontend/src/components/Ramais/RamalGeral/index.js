import React from 'react';
import { titleCase, latinise } from 'voca';
import Highlight from 'react-highlighter';

import { Container } from './styles';

export default function Ramal({ item, pesquisa }) {
  const { funcionarios, ramais } = item;

  const funcionariosGeral = funcionarios.filter(funcionario => {
    return funcionario.funcao === 'TORA';
  });

  const ramaisGeral = ramais.filter(ramal => {
    return ramal.tipo === 'Geral';
  });

  const montaFuncionarios = () => {
    const arrayFuncionarios = [];
    funcionariosGeral.map(funcionario => {
      return arrayFuncionarios.push(titleCase(funcionario.funcionario));
    });
    const stringFuncionarios = arrayFuncionarios.join(', ');

    return stringFuncionarios;
  };

  return (
    <Container>
      <span className="nome">
        <Highlight search={latinise(pesquisa)} ignoreDiacritics>
          {montaFuncionarios()}
        </Highlight>
      </span>
      {ramaisGeral.map(ramal => (
        <span className="ramal" key={ramal.ramal}>
          <Highlight search={pesquisa}>{String(ramal.ramal)}</Highlight>
        </span>
      ))}
    </Container>
  );
}
