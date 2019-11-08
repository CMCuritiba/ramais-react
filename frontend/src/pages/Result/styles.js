import styled from 'styled-components';

export const Pesquisa = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  width: 100%;
  padding-top: 20px;

  img {
    height: 60px;
    width: 60px;
    margin-right: 20px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Results = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1;

  max-width: 80%;
  width: 100%;
`;
