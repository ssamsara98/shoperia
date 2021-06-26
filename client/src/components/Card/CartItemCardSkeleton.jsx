import React from 'react';

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

export default CartItemCardSkeleton;
