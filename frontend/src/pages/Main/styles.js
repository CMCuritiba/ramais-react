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
    color: #eee;
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
    align-self: center;

    background: rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 4px;
    height: 64px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;
    font-size: 18px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  button {
    display: flex;

    height: 64px;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 20px;
    margin: 0 0 10px;
    margin-left: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.15, '#30666D')};
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
