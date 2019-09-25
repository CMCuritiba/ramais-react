import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex: 1;
  flex-direction: column;

  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin: 3px;
  padding: 20px;
  width: 100%;
  height: 100%;
  background: ${lighten(0.7, '#393434')};
  font-size: 14px;

  .setor {
    color: #393434;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
  }
  .localizacao {
    color: ${lighten(0.3, '#393434')};
    font-size: 14px;
  }
`;
