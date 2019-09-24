import React from 'react';

import { Container } from './styles';

import Setor from '../Setor';

export default function Lista({ lista }) {
  return (
    <Container>
      {lista.map(item => (
        <Setor key={item.id} item={item} />
      ))}
    </Container>
  );
}
