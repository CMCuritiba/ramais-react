import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex: 1;

  color: #ccc;

  span.nome {
    font-weight: bold;
    line-height: 30px;
    flex: 1;
  }

  span.ramal {
    font-weight: bold;
    line-height: 30px;
    margin-left: 20px;
  }
`;
