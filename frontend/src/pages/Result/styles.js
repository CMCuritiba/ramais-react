import styled from 'styled-components';
import { darken } from 'polished';

export const Pesquisa = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  width: 100%;
  padding-top: 20px;

  form {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex: 1;
  }

  img {
    height: 60px;
    width: 60px;
    margin-right: 20px;

    &:hover {
      cursor: pointer;
    }
  }

  input {
    display: flex;
    flex: 1;

    min-width: 300px;
    line-height: 18px;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    padding: 10px 20px;
  }

  button {
    display: flex;

    background: #30666d;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 10px 12px;
    margin-left: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#30666D')};
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
