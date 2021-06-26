import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cartAction } from '~/store/actions';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';

const CartItemCard = ({ item }) => {
  const [notEnough, setNotEnough] = useState(false);

  useEffect(() => {
    setNotEnough(() => item.quantity > item.product.stock);
    return () => {};
  }, []);

  return (
    <div className="flex space-x-5 py-3 px-5 rounded bg-white">
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
      <div className="w-1/5 flex flex-col justify-center items-center space-y-2">
        <div className="flex">
          <button
            className={`h-10 w-10 text-center border border-cool-gray-300 active:bg-cool-gray-200 disabled:opacity-75 bg-cool-gray-100`}
            disabled={notEnough}
          >
            -
          </button>
          <input
            type="text"
            className="h-10 w-full flex-1 text-center border-cool-gray-300"
            defaultValue={item.quantity}
            disabled={notEnough}
          />
          <button
            className={`h-10 w-10 text-center border border-cool-gray-300 active:bg-cool-gray-200 disabled:opacity-75 bg-cool-gray-100`}
            disabled={notEnough}
          >
            +
          </button>
        </div>
        {notEnough && <p className="text-center text-xs text-red-600">Stock is not enough</p>}
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
    <div className="flex space-x-5 py-3 px-5 rounded bg-white">
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

const CartItemTotal = ({ items = [{}] }) => {
  const calculatePrice = (items) => {
    const tmp = items
      .filter((item) => item.quantity <= item.product.stock)
      .map((item) => item.quantity * item.product.price);
    return tmp.length > 0 ? tmp.reduce((a, b) => a + b) : 0;
  };

  const calculateGoods = (items) => {
    const tmp = items
      .filter((item) => item.quantity <= item.product.stock)
      .map((item) => item.quantity);

    return `${tmp.length > 0 ? tmp.reduce((a, b) => a + b) : 0} with ${tmp.length} different items`;
  };

  return (
    <div className="flex flex-col space-y-2 w-full px-5 py-3 bg-white rounded">
      <div className="w-full">
        <strong className="font-bold">Total Goods</strong>
        <p>{calculateGoods(items)}</p>
      </div>
      <div className="w-full text-xl">
        <strong className="font-bold">Total Price</strong>
        <p className="text-xl">
          Rp
          {priceHelper(calculatePrice(items))}
        </p>
      </div>
      <div className="py-2">
        <button className="w-full px-3 py-5 rounded bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white">
          Checkout
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cartFetchItems } = bindActionCreators(cartAction, dispatch);
  const rsCart = useSelector((state) => state.cart);

  useLayoutEffect(() => {
    cartFetchItems();
    return () => {};
  }, []);

  return (
    <div className="flex w-full space-x-8">
      <div className="w-2/3">
        <h1 className="flex items-center text-3xl mb-5 h-10">Shopping Cart</h1>
        <div className="flex flex-col space-y-4 w-full">
          {/* cart item card */}
          {rsCart.items.length === 0
            ? [...new Array(5).keys()].map((key) => <CartItemCardSkeleton key={key} />)
            : rsCart.items.map((item) => <CartItemCard item={item} key={item.id} />)}
        </div>
      </div>
      <div className="w-1/3">
        <h2 className="flex items-center text-2xl mb-5 h-10">Sub-Total</h2>
        <CartItemTotal items={rsCart.items} />
      </div>
    </div>
  );
};

export default Cart;
