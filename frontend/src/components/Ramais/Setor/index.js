import React from 'react';

import { Container } from './styles';
import RamalChefia from '../RamalChefia';
import RamalGeral from '../RamalGeral';

export default function Setor({ item }) {
  return (
    <Container>
      <span className="setor">{item.nome}</span>
      <RamalChefia item={item} />
      <RamalGeral item={item} />
    </Container>
  );
}
