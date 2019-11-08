import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  color: #ccc;

  span.nome {
    flex: 1;
  }

  span.ramal {
    font-weight: bold;
    line-height: 30px;
    margin-left: 20px;
  }
`;
