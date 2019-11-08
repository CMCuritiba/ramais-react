import reducer, { INITIAL_STATE } from '../../../store/modules/auth/reducer';

import * as Auth from '../../../store/modules/auth/actions';
import expectExport from 'expect';

describe('Auth reducer', () => {
  it('@auth/SIGN_IN_REQUEST', () => {
    const state = reducer(INITIAL_STATE, Auth.signInRequest('zaca', 123456));

    expect(state.loading).toBe(true);
    expect(state.signed).toBe(false);
    expect(state.token).toBe(null);
    expect(state.usuario).toBe(null);
  });

  it('@auth/SIGN_IN_SUCCESS', () => {
    const usuario = {
      id: 2,
      username: 'zaca.rias',
      nome: 'Zaca dos Trapalhões',
      elotech_id: 1111,
      email: 'zaca.rias@cmc.pr.gov.br',
      is_admin: false,
    };
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYWxleG';

    const state = reducer(INITIAL_STATE, Auth.signInSuccess(token, usuario));

    expect(state.loading).toBe(false);
    expect(state.token).toBe(token);
    expect(state.usuario).toBe(usuario);
    expect(state.signed).toBe(true);
  });

  it('@auth/SIGN_IN_FAILURE', () => {
    const state = reducer(INITIAL_STATE, Auth.signFailure());

    expect(state.loading).toBe(false);
    expect(state.signed).toBe(false);
    expect(state.token).toBe(null);
    expect(state.usuario).toBe(null);
  });

  it('@auth/SIGN_OUT', () => {
    const state = reducer(INITIAL_STATE, Auth.signOut());

    expect(state.loading).toBe(false);
    expect(state.signed).toBe(false);
    expect(state.token).toBe(null);
    expect(state.usuario).toBe(null);
  });
});
