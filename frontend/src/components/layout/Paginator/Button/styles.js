import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props =>
    props.atual ? darken(0.1, '#007bff') : '#007bff'};
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 10px 15px;
  margin-left: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.1, '#007bff')};
  }
`;
