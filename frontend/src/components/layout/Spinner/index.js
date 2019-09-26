import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

export default function Spinner() {
  return (
    <Container>
      <FaSpinner size={80} />
    </Container>
  );
}
