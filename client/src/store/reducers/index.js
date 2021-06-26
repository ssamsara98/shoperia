import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import cartReducer from './cart-reducer';
import productReducer from './product-reducer';

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});

export default reducers;
