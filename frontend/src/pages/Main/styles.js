import styled from 'styled-components';
import { darken } from 'polished';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  img {
    height: 100px;
    width: 100px;
  }

  h1 {
    font-size: 28px;
    padding: 20px;
  }
`;

export const Pesquisa = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  width: 100%;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  input {
    display: flex;
    flex: 1;

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

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #eeeeee;
  height: 32px;
  width: 100%;
  border-top: #ccc 1px solid;

  span {
    margin-left: 6px;
    color: red;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  width: 100%;
`;
