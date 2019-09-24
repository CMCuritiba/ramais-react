import React from 'react';

import './config/ReactotronConfig';

import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Routes />

      <GlobalStyle />
    </>
  );
}

export default App;
