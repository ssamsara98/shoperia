import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';

const CartItemCard = ({ item }) => {
  const [notEnough, setNotEnough] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [updateQuantity, setUpdateQuantity] = useState(0);

  useEffect(() => {
    setNotEnough(() => item.quantity > item.product.stock);
    setQuantity(() => item.quantity);
    setUpdateQuantity(() => item.quantity);
    return () => {};
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      console.log(updateQuantity, 'debounce');
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, [updateQuantity]);

  const checkQuantity = (val) => {
    if (val > 0 && val <= item.product.stock) return val;
    if (val > item.product.stock) return item.product.stock;
    if (val < 1) return 1;
    return quantity;
  };

  const changeQuantity = (type) => {
    switch (type) {
      case 'inc':
        setQuantity((val) => checkQuantity(val + 1));
        setUpdateQuantity((val) => checkQuantity(val + 1));
        break;
      case 'dec':
        setQuantity((val) => checkQuantity(val - 1));
        setUpdateQuantity((val) => checkQuantity(val - 1));
        break;
      default:
        break;
    }
  };

  const changeQuantityText = (e) => {
    if (e.target.value === '') return setQuantity(() => '');
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val) {
      setQuantity(() => checkQuantity(val));
    }
  };

  const changeQuantityTextBlur = (e) => {
    console.log('updateQuantity', updateQuantity);
    if (quantity !== '' && !isNaN(parseInt(quantity))) {
      console.log('update');
      setUpdateQuantity(() => quantity);
    }
  };

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
            className="h-10 w-10 text-center border border-cool-gray-300 active:bg-cool-gray-200 disabled:opacity-75 bg-cool-gray-100 disabled:bg-cool-gray-100"
            onClick={() => changeQuantity('dec')}
          >
            -
          </button>
          <input
            type="text"
            className="h-10 w-full flex-1 text-center border-cool-gray-300"
            value={quantity}
            onChange={changeQuantityText}
            onBlur={changeQuantityTextBlur}
          />
          <button
            className="h-10 w-10 text-center border border-cool-gray-300 active:bg-cool-gray-200 disabled:opacity-75 bg-cool-gray-100 disabled:bg-cool-gray-100"
            onClick={() => changeQuantity('inc')}
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

export default CartItemCard;
