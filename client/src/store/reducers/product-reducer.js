import { productType } from '../types';

const initialState = {
  item: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productType.PRODUCT_SET_ITEM:
      return { ...state, item: { ...state.item, [action.payload.id]: action.payload } };
    default:
      return state;
  }
};

export default productReducer;
