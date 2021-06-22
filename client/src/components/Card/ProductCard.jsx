import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-inline w-1/5 pb-4 px-2">
      <div className="rounded-lg bg-white shadow w-full overflow-hidden">
        <Link to={`/products/${slugify(product.name)}-i.${product.id}`} className="w-full">
          <div className="h-auto relative bg-gray-400" style={{ paddingBottom: '100%' }}>
            <img src={imgHelper(product.images[0])} alt="product img" className="w-full absolute" />
          </div>
          <div className="relative p-2 flex flex-col" title={product.name}>
            <div className="mb-1 overflow-hidden line-clamp-2">{product.name}</div>
            <div className="flex justify-between mb-1 text-grey-700 font-bold">
              Rp{priceHelper(product.price)}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
