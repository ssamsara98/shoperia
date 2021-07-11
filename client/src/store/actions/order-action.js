import axios from 'axios';
import serverApi from '~/api/server-api';
import { orderType } from '../types';
import { authFetchLogout } from './auth-action';

export const orderStart = () => ({
  type: orderType.ORDER_START,
});

export const orderSuccess = (payload) => ({
  type: orderType.ORDER_SUCCESS,
  payload,
});

export const orderFail = (payload) => ({
  type: orderType.ORDER_FAIL,
  payload,
});

// async

export const orderFetchList = () => async (dispatch) => {
  try {
    dispatch(orderStart());
    const order = await serverApi.get('/api/v1/order/get-order-list');
    dispatch(orderSuccess(order.data.data));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      dispatch(orderFail(err.response.data));
      if (err.response.status === 401) dispatch(authFetchLogout());
    }
  }
};
