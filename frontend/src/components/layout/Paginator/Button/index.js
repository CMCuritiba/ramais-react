import React from 'react';

import { Container } from './styles';

const Button = ({ value, handleClickPagina, page }) => {
  return page === value ? (
    <Container onClick={() => handleClickPagina(value)} atual={1}>
      {value}
    </Container>
  ) : (
    <Container onClick={() => handleClickPagina(value)}>{value}</Container>
  );
};

export default Button;
