import { orderType } from '../types';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderType.ORDER_START:
      return { ...state, loading: true, error: null };
    case orderType.ORDER_SUCCESS:
      return { ...state, loading: false, error: null, list: action.payload };
    case orderType.ORDER_FAIL:
      return { ...state, loading: false, error: action.payload, list: [] };
    default:
      return state;
  }
};

export default orderReducer;
