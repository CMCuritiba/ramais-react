import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';

import { Container, Title, Info, User, Menu } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import history from '~/service/history';

export default function Header({ selected = 'PESQUISA' }) {
  const { usuario } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  function handlePesquisaClick() {
    history.push('/');
  }

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

  function handleRamaisEspeciaisClick() {
    history.push('/admin/ramais-especiais');
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Info>
        <Title>admin Ramais</Title>
        <User>
          <div>{usuario.username}</div>
          <button
            type="button"
            className="button-exit"
            onClick={() => handleLogout()}
          >
            <FaSignOutAlt size={18} />
          </button>
        </User>
      </Info>
      <Menu>
        <span
          onClick={() => handlePesquisaClick()}
          className={selected === 'PESQUISA' ? 'selected' : null}
        >
          Pesquisa
        </span>
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
        <span
          onClick={() => handleRamaisEspeciaisClick()}
          className={selected === 'ESPECIAIS' ? 'selected' : null}
        >
          Ramais Especiais
        </span>
      </Menu>
    </Container>
  );
}
