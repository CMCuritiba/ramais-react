import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 0.1);
  height: 100vh;
  /* box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.3); */

  form {
    display: flex;
    align-items: center;
    /* flex-direction: column; */
    justify-content: center;
    flex: 1;

    width: 100%;
    /* height: 100%; */
  }

  input {
    display: flex;
    /* flex: 1; */
    align-self: center;

    width: 100%;
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
    justify-content: center;

    font-size: 18px;
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

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  height: 100%;
  width: 100%;
`;
