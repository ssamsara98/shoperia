import { cartType } from '../types';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartType.CART_START:
      return { ...state, loading: true };
    case cartType.CART_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case cartType.CART_FAIL:
      return { ...state, loading: false, error: action.payload };
    case cartType.CART_ITEM_UPDATE:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...action.payload, product: item.product };
          }
          return item;
        }),
      };
    case cartType.CART_ITEM_DELETE:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => {
          if (item.product.id !== action.payload) {
            return true;
          }
          return false;
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
