import React from 'react';
import { titleCase } from 'voca';

import { Container } from './styles';

export default function RamalChefia({ item }) {
  const { funcionarios, ramais } = item;

  const funcionariosChefia = funcionarios.filter(funcionario => {
    return funcionario.funcao === 'CHEFE';
  });

  const ramaisChefia = ramais.filter(ramal => {
    return ramal.tipo === 'Chefia';
  });

  return (
    <Container>
      {funcionariosChefia.map(funcionario => (
        <span className="nome" key={funcionario.funcionario}>
          {titleCase(`${funcionario.funcionario} (Chefia)`)}
        </span>
      ))}
      {ramaisChefia.map(ramal => (
        <span className="ramal" key={ramal.ramal}>
          {ramal.ramal}
        </span>
      ))}
    </Container>
  );
}
