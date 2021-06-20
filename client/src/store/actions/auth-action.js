import axios from 'axios';

import serverApi from '~/api/server-api';
import { authType } from '../types';

export const authStart = () => {
  return {
    type: authType.AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: authType.AUTH_SUCCESS,
    payload: {
      user,
    },
  };
};

export const authFail = (err) => {
  return {
    type: authType.AUTH_FAIL,
    payload: {
      error: err,
    },
  };
};

export const authLogout = () => {
  return {
    type: authType.AUTH_LOGOUT,
  };
};

// async

export const authFetchLogin =
  (user_session, password, remember_me = false) =>
  async (dispatch) => {
    // const loginForm = { user_session, password };
    try {
      dispatch(authStart());

      const loginResp = await serverApi.post('/api/v1/auth/login', { user_session, password });

      const user = loginResp.data.data.user;
      dispatch(authSuccess(user));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response.status === 500) {
          dispatch(authFail({ message: err.response.statusText }));
        } else {
          dispatch(authFail(err.response.data.error));
        }
      } else {
        dispatch(authFail(err));
      }
      throw err;
    }
  };

export const authFetchLogout = () => async (dispatch) => {
  dispatch(authStart());
  await serverApi.post('/api/v1/auth/logout');
  dispatch(authLogout());
};

export const authFetchMe = () => async (dispatch) => {
  try {
    dispatch(authStart());

    const profileResp = await serverApi.get('/api/v1/user/me');

    const user = profileResp.data.data;
    dispatch(authSuccess(user));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response.status === 500) {
        dispatch(authFail({ message: err.response.statusText }));
      } else {
        dispatch(authFail(err.response.data.error));
      }
    } else {
      dispatch(authFail(err));
    }
  }
};
