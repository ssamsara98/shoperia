import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartItemCard from '~/components/Card/CartItemCard';
import CartItemCardSkeleton from '~/components/Card/CartItemCardSkeleton';
import CartItemTotal from '~/components/Card/CartItemTotal';
import { cartAction } from '~/store/actions';

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
          {rsCart.loading && !rsCart.items.length ? (
            [...new Array(5).keys()].map((key) => <CartItemCardSkeleton key={key} />)
          ) : !!rsCart.items.length ? (
            rsCart.items.map((item) => <CartItemCard item={item} key={item.id} />)
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
      <div className="w-1/3">
        <h2 className="flex items-center text-2xl mb-5 h-10">Totals</h2>
        <CartItemTotal />
      </div>
    </div>
  );
};

export default Cart;
