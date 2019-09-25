import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;

  margin-top: 30px;

  width: 100%;
  /* background-color: #fff; */

  h1 {
    color: ${lighten(0.2, '#393434')};
    font-size: 24px;
  }
`;
