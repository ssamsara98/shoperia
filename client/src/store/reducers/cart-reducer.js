import { cartType } from '../types';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartType.CART_FETCH_ITEMS_START:
      return { ...state, loading: true };
    case cartType.CART_FETCH_ITEMS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case cartType.CART_FETCH_ITEMS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
