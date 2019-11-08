import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

// import background from '../assets/brasao.png';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
    background-image: linear-gradient(#042F3A,#30666D);
  }

  #root {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font: 14px Roboto, sans-serif;
  }

  button {
    cursor: pointer;
  }

`;
