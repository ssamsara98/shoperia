import serverApi from '~/api/serverApi';

import { AUTH_FAIL, AUTH_SUCCESS, AUTH_START, AUTH_DESTROY } from './auth-types';

export function authLogin(user) {
  return async function (dispatch) {
    dispatch(authStart());
    try {
      let resp = null;
      if (user) {
        const { user_session, password } = user;
        resp = await serverApi.post('/auth/login', { user_session, password });
      } else {
        resp = await serverApi.get('/users/me');
      }
      dispatch(authSuccess(resp.data.data.user));
    } catch (err) {
      dispatch(authFail(err.response.data));
    }
  };
}

export function authStart() {
  return { type: AUTH_START };
}

export function authFail(error) {
  return { type: AUTH_FAIL, payload: { error } };
}

export function authSuccess(user) {
  return { type: AUTH_SUCCESS, payload: { user } };
}

export function authDestroy() {
  return function (dispatch) {
    serverApi.post('/auth/logout').then(() => {
      dispatch({ type: AUTH_DESTROY });
    });
  };
}
