import React from 'react';
import { titleCase } from 'voca';

import Highlight from 'react-highlighter';
import { Container } from './styles';

export default function RamalDiretoria({ item, pesquisa }) {
  const { funcionarios, ramais } = item;

  const funcionariosDiretoria = funcionarios.filter(funcionario => {
    return funcionario.funcao === 'DIRETOR';
  });

  const ramaisDiretoria = ramais.filter(ramal => {
    return ramal.tipo === 'DIRETORIA';
  });

  return (
    <Container>
      {funcionariosDiretoria.map(funcionario => (
        <span className="nome" key={funcionario.funcionario}>
          <Highlight search={pesquisa} ignoreDiacritics>
            {titleCase(`${funcionario.funcionario} (Diretoria)`)}
          </Highlight>
        </span>
      ))}
      {ramaisDiretoria.map(ramal => (
        <span className="ramal" key={ramal.ramal}>
          <Highlight search={pesquisa}>{String(ramal.ramal)}</Highlight>
        </span>
      ))}
    </Container>
  );
}
