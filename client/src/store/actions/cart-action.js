import axios from 'axios';
import serverApi from '~/api/server-api';
import { cartType } from '../types';
import { authFetchLogout } from './auth-action';

export const cartStart = () => ({
  type: cartType.CART_START,
});

export const cartSuccess = (payload) => ({
  type: cartType.CART_SUCCESS,
  payload,
});

export const cartFail = (payload) => ({
  type: cartType.CART_FAIL,
  payload,
});

export const cartItemUpdate = (payload) => ({
  type: cartType.CART_ITEM_UPDATE,
  payload,
});

export const cartItemDelete = (payload) => ({
  type: cartType.CART_ITEM_DELETE,
  payload,
});

// async

export const cartFetchItems = () => async (dispatch) => {
  try {
    dispatch(cartStart());
    const cart = await serverApi.get('/api/v1/cart/get-cart');
    dispatch(cartSuccess(cart.data.data));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(cartFail(err.response.data));
      if (err.response.status === 401) dispatch(authFetchLogout());
    }
  }
};

export const cartFetchItemUpdate = (productId, quantity) => async (dispatch) => {
  try {
    dispatch(cartStart());
    const item = await serverApi.post('/api/v1/cart/add-cart-item', {
      productId,
      quantity,
      modified: true,
    });
    dispatch(cartItemUpdate(item.data.data));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(cartFail(err.response.data.error));
      if (err.response.status === 401) dispatch(authFetchLogout());
    }
  }
};

export const cartFetchItemDelete = (productId) => async (dispatch) => {
  try {
    dispatch(cartStart());
    await serverApi.delete('/api/v1/cart/delete-cart-item', {
      data: { productId },
    });
    dispatch(cartItemDelete(productId));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(cartFail(err.response.data.error));
      if (err.response.status === 401) dispatch(authFetchLogout());
    }
  }
};
