import React from 'react';

const ProductCardSkeleton = ({ product }) => {
  return (
    <div className="flex flex-inline w-1/5 pb-4 px-2">
      <div className="rounded-lg bg-white shadow w-full overflow-hidden">
        <div
          className="h-auto relative bg-gray-400 animate-pulse"
          style={{ paddingBottom: '100%' }}
        ></div>
        <div className="relative p-2 flex flex-col">
          <div className="mb-1 overflow-hidden line-clamp-2 bg-gray-400 rounded pb-8 animate-pulse"></div>
          <div className="flex justify-between mb-1 text-grey-700 font-bold bg-gray-400 rounded pb-8 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
