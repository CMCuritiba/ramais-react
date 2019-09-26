import React from 'react';

import { Container } from './styles';

const Button = ({ value, handleClickPagina, page, loading }) => {
  return page === value ? (
    <Container
      onClick={() => handleClickPagina(value)}
      atual={1}
      disabled={loading}
    >
      {value}
    </Container>
  ) : (
    <Container onClick={() => handleClickPagina(value)} disabled={loading}>
      {value}
    </Container>
  );
};

export default Button;
