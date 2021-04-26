import serverApi from '~/api/serverApi';
import { AUTH_FAIL, AUTH_SUCCESS, AUTH_START } from './auth-types';

export function authLogin({ user_session, password }) {
  return async function (dispatch) {
    dispatch(authStart());
    try {
      const resp = await serverApi.post('/auth/login', { user_session, password });
      dispatch(authSuccess(resp.data.data.user));
    } catch (err) {
      dispatch(err.response.data);
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
