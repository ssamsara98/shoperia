import { addressType } from '../types';

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case addressType.ADDRESS_START:
      return { ...state, loading: true };
    case addressType.ADDRESS_SUCCESS:
      return { ...state, loading: false, error: null, addresses: action.payload };
    case addressType.ADDRESS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default addressReducer;
