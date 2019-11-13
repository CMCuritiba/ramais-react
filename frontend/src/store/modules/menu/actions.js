export function selectRequest(menuItem) {
  return {
    type: '@menu/SELECT_REQUEST',
    payload: { menuItem },
  };
}

export function selectSuccess(menuItem) {
  return {
    type: '@menu/SELECT_SUCCESS',
    payload: { token, usuario },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
