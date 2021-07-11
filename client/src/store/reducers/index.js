import { combineReducers } from 'redux';
import addressReducer from './address-reducer';
import authReducer from './auth-reducer';
import cartReducer from './cart-reducer';
import orderReducer from './order-reducer';
import productReducer from './product-reducer';

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
});

export default reducers;
