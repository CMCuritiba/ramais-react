import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 415px;
  text-align: center;

  span {
    color: yellow;
    align-self: flex-start;
    font-size: 15px;
    font-weight: bold;
    margin-left: 5px;
    margin-bottom: 10px;
  }

  form {
    /* display: flex; */
    flex-direction: column;
  }

  button {
    width: 100%;
  }

  a {
    color: #fff;
    margin-top: 15px;
    font-size: 24px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;

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
