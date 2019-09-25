import React from 'react';

import { Container } from './styles';
import Button from './Button';

const Paginator = ({ totalPages, handleClickPagina, page }) => {
  // console.tron.log(`Total de ${totalPages} páginas`);
  return (
    <Container>
      {totalPages > 1
        ? Array.from(Array(totalPages), (e, i) => (
            <Button
              key={i + 1}
              value={i + 1}
              handleClickPagina={() => handleClickPagina(i + 1)}
              page={page}
            />
          ))
        : null}
    </Container>
  );
};

export default Paginator;
