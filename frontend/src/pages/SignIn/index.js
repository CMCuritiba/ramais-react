import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import brasao from '../../assets/brasao.png';
import { signInRequest } from '~/store/modules/auth/actions';
import { Container, Header } from './styles';

const schema = Yup.object().shape({
  username: Yup.string().required('O usuário é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ username, password }) {
    dispatch(signInRequest(username, password));
  }

  return (
    <Container>
      <Header>
        <img src={brasao} alt="Brasão CMC" />
        <h1>Ramais CMC</h1>
      </Header>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="username"
          type="text"
          placeholder="Entre com o seu usuário (LDAP)"
        />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">{loading ? 'Carregando...' : 'Entrar'}</button>
      </Form>
    </Container>
  );
}
