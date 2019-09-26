import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  svg {
    animation: ${rotate} 2s linear infinite;
    color: ${lighten(0.2, '#007bff')};
  }
`;
