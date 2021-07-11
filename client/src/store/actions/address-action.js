import axios from 'axios';
import serverApi from '~/api/server-api';
import { addressType } from '../types';
import { authFetchLogout } from './auth-action';

export const addressStart = () => ({
  type: addressType.ADDRESS_START,
});

export const addressSuccess = (payload) => ({
  type: addressType.ADDRESS_SUCCESS,
  payload,
});

export const addressFail = (payload) => ({
  type: addressType.ADDRESS_FAIL,
  payload,
});

// async

export const addressFetchList = (payload) => async (dispatch) => {
  try {
    dispatch(addressStart());
    const addressListResp = await serverApi.get('/api/v1/address/get-address-list');
    dispatch(addressSuccess(addressListResp.data.data));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response.status === 500) {
        dispatch(addressFail({ message: err.response.statusText }));
      } else {
        dispatch(addressFail(err.response.data.error));
      }
      if (err.response.status === 401) dispatch(authFetchLogout());
    } else {
      dispatch(addressFail(err));
    }
  }
};
