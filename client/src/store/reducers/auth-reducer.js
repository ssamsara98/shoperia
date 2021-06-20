import { authType } from '../types';

const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authType.AUTH_START:
      return { ...state, loading: true };
    case authType.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        error: null,
        user: action.payload.user,
      };
    case authType.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload.error,
      };
    case authType.AUTH_LOGOUT:
      return { ...initialState, loading: false, error: null };
    default:
      return state;
  }
};

export default authReducer;
