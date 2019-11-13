import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* flex: 1; */

  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 30px;
  background-color: #30666d;
  width: 100%;
  max-height: 80px;
  height: 100%;
  color: #fff;
  /* border-bottom: 3px solid transparent; */

  & span:hover {
    cursor: pointer;
    border-bottom: 4px solid #b7d700;
  }
`;

export const Info = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  /* flex: 1; */

  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;

  font-size: 22px;
`;

export const User = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  /* flex: 1; */

  font-size: 16px;
  color: #ddd;

  button.button-exit {
    justify-content: center;

    height: 20px;
    background: none;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 5px;
    margin-left: 4px;

    &:hover {
      background: none;
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: left;

  width: 100%;
  font-size: 16px;
  color: ${darken(0.15, '#0776a6')};
  height: 100%;
  margin-left: -20px;

  span {
    /* display: flex;
    flex: 1; */
    color: #fff;
    padding: 5px 14px;
    border-bottom: 4px solid transparent;
  }

  span.selected {
    border-bottom: 4px solid #b7d700;
  }
`;
