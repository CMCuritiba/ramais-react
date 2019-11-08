import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex: 1;
  flex-direction: column;

  border-radius: 4px;
  border: 1px solid rgba(48, 102, 109, 0.2);
  margin: 3px;
  padding: 20px;
  width: 100%;
  height: 100%;
  /* background: ${lighten(0.7, '#393434')}; */
  background: rgba(0, 0, 0, 0.2);
  font-size: 14px;

  .setor {
    color: #eee;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
  }
  .localizacao {
    color: #ccc;
    font-size: 14px;
  }
`;
