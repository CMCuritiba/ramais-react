import React from 'react';

import Highlight from 'react-highlighter';
import { Container } from './styles';
import RamalDiretoria from '../RamalDiretoria';
import RamalChefia from '../RamalChefia';
import RamalGeral from '../RamalGeral';

export default function Setor({ item, pesquisa }) {
  return (
    <Container>
      <span className="setor">
        <Highlight search={pesquisa} ignoreDiacritics>
          {item.nome}
        </Highlight>
      </span>
      <span className="localizacao">
        {item.localizacao} - {item.pavimento}
      </span>
      <RamalDiretoria item={item} pesquisa={pesquisa} />
      <RamalChefia item={item} pesquisa={pesquisa} />
      <RamalGeral item={item} pesquisa={pesquisa} />
    </Container>
  );
}
