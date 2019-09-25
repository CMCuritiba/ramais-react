import React from 'react';

import { Container } from './styles';

import Setor from '../Setor';

export default function Lista({ lista, pesquisa }) {
  return (
    <Container>
      {lista.length > 0 ? (
        lista.map(item => (
          <Setor key={item.id} item={item} pesquisa={pesquisa} />
        ))
      ) : (
        <h1>Nenhuma informação encontrada</h1>
      )}
    </Container>
  );
}
