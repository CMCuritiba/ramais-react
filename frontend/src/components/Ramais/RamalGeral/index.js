import React from 'react';
import { titleCase } from 'voca';

import { Container } from './styles';

export default function Ramal({ item }) {
  const { funcionarios, ramais } = item;

  const funcionariosGeral = funcionarios.filter(funcionario => {
    return funcionario.funcao === 'TORA';
  });

  const ramaisGeral = ramais.filter(ramal => {
    return ramal.tipo === 'Geral';
  });

  return (
    <Container>
      <span className="nome">
        {funcionariosGeral.map(funcionario => (
          <span key={funcionario.funcionario}>
            {titleCase(`${funcionario.funcionario}, `)}
          </span>
        ))}
      </span>
      {ramaisGeral.map(ramal => (
        <span className="ramal" key={ramal.ramal}>
          {ramal.ramal}
        </span>
      ))}
    </Container>
  );
}
