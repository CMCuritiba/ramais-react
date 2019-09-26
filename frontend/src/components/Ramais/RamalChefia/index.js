import React from 'react';
import { titleCase } from 'voca';

import Highlight from 'react-highlighter';
import { Container } from './styles';

export default function RamalChefia({ item, pesquisa }) {
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
          <Highlight search={pesquisa} ignoreDiacritics>
            {titleCase(`${funcionario.funcionario} (Chefia)`)}
          </Highlight>
        </span>
      ))}
      {ramaisChefia.map(ramal => (
        <span className="ramal" key={ramal.ramal}>
          <Highlight search={pesquisa}>{String(ramal.ramal)}</Highlight>
        </span>
      ))}
    </Container>
  );
}
