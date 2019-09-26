import React from 'react';

import { Container, Title, Info, User, Menu } from './styles';

export default function Header({ user, history }) {
  function handleRamaisClick() {
    history.push('/admin/ramais');
  }

  function handleSetoresClick() {
    history.push('/admin/setores');
  }

  function handleLocalizacoesClick() {
    history.push('/admin/localizacoes');
  }

  function handlePavimentosClick() {
    history.push('/admin/pavimentos');
  }

  return (
    <Container>
      <Info>
        <Title>admin Ramais</Title>
        <User>
          <div>usuário logado: {user}</div>
        </User>
      </Info>
      <Menu>
        <span onClick={() => handleRamaisClick()}>Ramais</span>
        <span onClick={() => handleSetoresClick()}>Setores</span>
        <span onClick={() => handleLocalizacoesClick()}>Localizações</span>
        <span onClick={() => handlePavimentosClick()}>Pavimentos</span>
      </Menu>
    </Container>
  );
}
