import React from 'react';
import { titleCase } from 'voca';

import { Container } from './styles';
import Highlighter from '../../../service/Highlighter';

export default function Ramal({ item, pesquisa }) {
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
            {Highlighter.highlightText(
              pesquisa,
              titleCase(`${funcionario.funcionario}, `)
            )}
          </span>
        ))}
      </span>
      {ramaisGeral.map(ramal => (
        <span className="ramal" key={ramal.ramal}>
          {Highlighter.highlightText(pesquisa, String(ramal.ramal))}
        </span>
      ))}
    </Container>
  );
}
