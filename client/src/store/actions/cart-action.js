import axios from 'axios';
import serverApi from '~/api/server-api';
import { cartType } from '../types';
import { authFetchLogout } from './auth-action';

export const cartFetchItemsStart = () => ({
  type: cartType.CART_FETCH_ITEMS_START,
});

export const cartFetchItemsSuccess = (payload) => ({
  type: cartType.CART_FETCH_ITEMS_SUCCESS,
  payload,
});

export const cartFetchItemsFail = (payload) => ({
  type: cartType.CART_FETCH_ITEMS_FAIL,
  payload,
});

// async

export const cartFetchItems = () => {
  return async (dispatch) => {
    try {
      dispatch(cartFetchItemsStart());
      const cart = await serverApi.get('/api/v1/cart/get-cart');
      dispatch(cartFetchItemsSuccess(cart.data.data));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(cartFetchItemsFail(err.response.data));
        dispatch(authFetchLogout());
      }
    }
  };
};
