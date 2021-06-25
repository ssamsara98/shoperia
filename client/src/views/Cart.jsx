import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import serverApi from '~/api/server-api';
import { authAction } from '~/store/actions';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';

const CartItemCard = ({ item }) => {
  return (
    <div className="flex space-x-5 py-3 px-5 bg-white">
      <div className="w-1/5">
        <div
          className="relative rounded overflow-hidden bg-cool-gray-200"
          style={{ paddingBottom: '100%' }}
        >
          <img
            src={imgHelper(item?.product.images[0], '200-square')}
            alt="Img"
            className="absolute left-0 top-0 w-full"
          />
        </div>
      </div>
      <div className="w-2/5">
        <p className="line-clamp-2 mb-4" title={item?.product.name}>
          {item?.product.name}
        </p>
        <p className="line-clamp-1 font-bold">Rp{priceHelper(item?.product.price)}</p>
      </div>
      <div className="w-1/5 flex justify-evenly items-center">
        <div className="flex">
          <button className="h-10 w-10 text-center border border-cool-gray-300 active:bg-cool-gray-200">
            -
          </button>
          <input
            type="text"
            className="h-10 w-full flex-1 text-center border-cool-gray-300"
            defaultValue={item.quantity}
            disabled
          />
          <button className="h-10 w-10 text-center border border-cool-gray-300 active:bg-cool-gray-200">
            +
          </button>
        </div>
      </div>
      <div className="w-1/5 flex justify-center items-center">
        <button
          className="h-10 w-10 flex justify-center items-center active:bg-cool-gray-200"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

const CartItemCardSkeleton = () => {
  return (
    <div className="flex space-x-5 py-3 px-5 bg-white">
      <div className="w-1/5">
        <div
          className="relative rounded overflow-hidden bg-cool-gray-300 animate-pulse"
          style={{ paddingBottom: '100%' }}
        ></div>
      </div>
      <div className="w-2/5">
        <p className="line-clamp-2 w-full pb-12 mb-4 bg-cool-gray-300 animate-pulse"></p>
        <p className="line-clamp-1 pb-6 bg-cool-gray-300 animate-pulse"></p>
      </div>
      <div className="w-1/5 flex justify-evenly items-center">
        <div className="flex h-10 w-full bg-cool-gray-300 animate-pulse"></div>
      </div>
      <div className="w-1/5 flex justify-center items-center">
        <div className="h-10 w-10 flex justify-center items-center bg-cool-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const { authFetchLogout } = bindActionCreators(authAction, dispatch);
  const [cart, setCart] = useState([]);

  useLayoutEffect(() => {
    async function fetchCart() {
      try {
        const cart = await serverApi.get('/api/v1/cart/get-cart');
        setCart(() => cart.data.data);
      } catch (err) {
        authFetchLogout();
      }
    }
    fetchCart();
    return () => {};
  }, []);

  return (
    <div className="flex w-full space-x-8">
      <div className="w-2/3">
        <h1 className="text-3xl pb-5">Shopping Cart</h1>
        <div className="flex flex-col space-y-4 w-full">
          {/* cart item card */}
          {cart.length === 0
            ? [...new Array(5).keys()].map((key) => <CartItemCardSkeleton key={key} />)
            : cart.map((item) => <CartItemCard item={item} key={item.id} />)}
        </div>
      </div>
      <div className="w-1/3">
        <h2 className="text-2xl">Sub-Total</h2>
      </div>
    </div>
  );
};

export default Cart;
