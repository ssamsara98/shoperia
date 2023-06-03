import { loadStripe } from '@stripe/stripe-js';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import serverApi from '~/api/server-api';
import { orderAction } from '~/store/actions';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';

const Orders = (props) => {
  const dispatch = useDispatch();
  const { orderFetchList } = bindActionCreators(orderAction, dispatch);
  const order = useSelector((state) => state.order);
  const [payLoading, setPayLoading] = useState(false);

  useLayoutEffect(() => {
    const query = new URLSearchParams(props.location.search);
    (async () => {
      if (JSON.parse(query.get('success'))) {
        try {
          await serverApi.patch(`/api/v1/order/pay-order/${query.get('orderId')}`);
        } catch (err) {
          console.error(err);
        } finally {
          window.location.href = '/';
        }
      }
      orderFetchList();
    })();

    return () => {};
  }, []);

  const handlePayment = async (orderId) => {
    setPayLoading(true);
    try {
      console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      const {
        data: { data: session },
      } = await serverApi.post(`/api/v1/order/create-stripe-checkout-session/${orderId}`);
      console.log(session);
      stripe.redirectToCheckout({ sessionId: session.id });
    } catch (err) {
      console.error(err);
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center py-4">
        <h1 className="text-lg">Orders</h1>
      </div>
      <hr className="border border-black" />
      <div className="flex flex-col pt-8">
        {/* boxes */}
        {order.list.map((orderUnit) => (
          <div className="flex flex-col my-3 px-5 pb-3 shadow" key={orderUnit.id}>
            {/* status */}
            <div className="flex items-center py-4 justify-between border-b-2">
              <p className="text-lg text-sky-600 uppercase">{orderUnit.status}</p>
              <button className="px-2 py-1 rounded bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-sm">
                Detail
              </button>
            </div>
            {/* items */}
            <div className="mt-5 border-b-2">
              {orderUnit.items.map((item) => (
                <div className="flex mb-2" key={item.id}>
                  <div className="flex flex-1 space-x-5">
                    {/* image */}
                    <div className="w-1/6">
                      <div
                        className="w-full relative bg-cool-gray-400"
                        style={{ paddingBottom: '100%' }}
                      >
                        <img
                          src={imgHelper(item.images[0], '100-square')}
                          alt="item img"
                          className="absolute top-0 left-0 w-full"
                        />
                      </div>
                    </div>
                    {/* desc */}
                    <div className="flex flex-1 flex-col">
                      <p className="font-bold line-clamp-1" title={item.name}>
                        {item.name}
                      </p>
                      <p className="line-clamp-1">Rp{priceHelper(item.price)}</p>
                      <p className="line-clamp-1">x{item.quantity}</p>
                    </div>
                  </div>
                  {/* total item price */}
                  <div className="flex items-center justify-center">
                    <p>Rp{priceHelper(item.totalPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* total */}
            <div className="flex justify-end items-center py-4">
              <p className="mr-2">Total Pesanan:</p>
              <p className="text-2xl text-sky-600 uppercase">
                Rp{priceHelper(orderUnit.amount.total)}
              </p>
            </div>
            {/* action */}
            <div className="flex py-4 border-b-2">
              <div className="flex-1"></div>
              <div className="flex-1 flex justify-end">
                {orderUnit.status === 'pending' && (
                  <button
                    className="w-1/3 px-3 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-cool-gray-500 disabled:opacity-75 text-white rounded"
                    onClick={() => handlePayment(orderUnit.id)}
                    disabled={payLoading}
                  >
                    Pay Now
                  </button>
                )}
                {orderUnit.status === 'paid' && (
                  <button className="w-1/3 px-3 py-2 bg-cool-gray-400 text-white rounded">
                    Paid
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
