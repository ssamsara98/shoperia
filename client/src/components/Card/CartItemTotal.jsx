import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import priceHelper from '~/utils/price-helper';

const CartItemTotal = ({ items = [{}], loading = false }) => {
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
        <p className="text-xl">Rp{priceHelper(calculatePrice(items))}</p>
      </div>
      <div className="py-2">
        <button
          className="w-full px-3 py-5 rounded bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-sky-600 text-white disabled:opacity-75"
          disabled={items.length === 0 || loading}
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default CartItemTotal;
