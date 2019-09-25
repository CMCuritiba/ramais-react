import React from 'react';
import { titleCase } from 'voca';

import { Container } from './styles';
import Highlighter from '../../../service/Highlighter';

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
          {Highlighter.highlightText(
            pesquisa,
            titleCase(`${funcionario.funcionario} (Chefia)`)
          )}
        </span>
      ))}
      {ramaisChefia.map(ramal => (
        <span className="ramal" key={ramal.ramal}>
          {Highlighter.highlightText(pesquisa, String(ramal.ramal))}
        </span>
      ))}
    </Container>
  );
}
