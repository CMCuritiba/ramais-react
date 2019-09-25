import React from 'react';

import { Container } from './styles';
import RamalChefia from '../RamalChefia';
import RamalGeral from '../RamalGeral';
import Highlighter from '../../../service/Highlighter';

export default function Setor({ item, pesquisa }) {
  return (
    <Container>
      <span className="setor">
        {Highlighter.highlightText(pesquisa, item.nome)}
      </span>
      <span className="localizacao">
        {item.localizacao} - {item.pavimento}
      </span>
      <RamalChefia item={item} pesquisa={pesquisa} />
      <RamalGeral item={item} pesquisa={pesquisa} />
    </Container>
  );
}
