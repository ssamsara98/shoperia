import { AUTH_DESTROY, AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from '../actions/auth-types';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_DESTROY:
      return authDestroy();
    default:
      return state;
  }
};

// actions

function authStart(state) {
  return { ...state, error: null, loading: true };
}

function authFail(state, action) {
  return { ...state, error: action.payload.error, loading: false };
}

function authSuccess(state, action) {
  return {
    ...state,
    error: null,
    loading: false,
    user: action.payload.user,
    isAuthenticated: true,
  };
}

function authDestroy() {
  return initialState;
}

export default authReducer;
