import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import slugify from 'slugify';
import { cartAction } from '~/store/actions';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const { cartFetchItemUpdate, cartFetchItemDelete } = bindActionCreators(cartAction, dispatch);
  const [notEnough, setNotEnough] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity || 0);
  const [updateQuantity, setUpdateQuantity] = useState(item.quantity || 0);

  useEffect(() => {
    setNotEnough(() => item.quantity > item.product.stock);
    return () => {};
  }, [item.quantity]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (item.quantity !== updateQuantity) {
        cartFetchItemUpdate(item.product.id, updateQuantity);
      }
    }, 800);

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

  const changeQuantityKeypress = (e) => {
    if (e.key === 'ArrowUp') {
      setQuantity((val) => checkQuantity(val + 1));
    }
    if (e.key === 'ArrowDown') {
      setQuantity((val) => checkQuantity(val - 1));
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
    if (quantity !== '' && !isNaN(parseInt(quantity))) {
      setUpdateQuantity(() => quantity);
    }
  };

  const deleteItem = (e) => {
    e.preventDefault();
    cartFetchItemDelete(item.product.id);
  };

  return (
    <div
      className={`flex space-x-5 py-3 px-5 rounded bg-white${
        item?.product.stock === 0 || notEnough ? ' opacity-75' : ''
      }`}
    >
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
        <Link
          to={{ pathname: `/products/${slugify(item?.product.name)}-i.${item?.product.id}` }}
          className="hover:underline"
        >
          <p className="line-clamp-2 mb-4" title={item?.product.name}>
            {item?.product.name}
          </p>
        </Link>
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
            onKeyDown={changeQuantityKeypress}
          />
          <button
            className="h-10 w-10 text-center border border-cool-gray-300 active:bg-cool-gray-200 disabled:opacity-75 bg-cool-gray-100 disabled:bg-cool-gray-100"
            onClick={() => changeQuantity('inc')}
          >
            +
          </button>
        </div>
        {notEnough && <p className="text-center text-xs text-red-600">Stock is not enough</p>}
        {item?.product.stock === 0 && (
          <p className="text-center text-xs text-red-600">Product is empty</p>
        )}
      </div>
      <div className="w-1/5 flex justify-center items-center">
        <button
          className="h-10 w-10 flex justify-center items-center active:bg-cool-gray-200"
          onClick={deleteItem}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
