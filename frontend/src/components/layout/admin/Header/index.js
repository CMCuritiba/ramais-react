import React from 'react';

import { Container, Title, Info, User, Menu } from './styles';

export default function Header({ user, history, selected }) {
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
        <span
          onClick={() => handleRamaisClick()}
          className={selected === 'RAMAIS' ? 'selected' : null}
        >
          Ramais
        </span>
        <span
          onClick={() => handleSetoresClick()}
          className={selected === 'SETORES' ? 'selected' : null}
        >
          Setores
        </span>
        <span
          onClick={() => handleLocalizacoesClick()}
          className={selected === 'LOCALIZACOES' ? 'selected' : null}
        >
          Localizações
        </span>
        <span
          onClick={() => handlePavimentosClick()}
          className={selected === 'PAVIMENTOS' ? 'selected' : null}
        >
          Pavimentos
        </span>
      </Menu>
    </Container>
  );
}
