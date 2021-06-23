import { productType } from '../types';

export const productSetItem = (item) => {
  return {
    type: productType.PRODUCT_SET_ITEM,
    payload: item,
  };
};
