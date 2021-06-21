import React from 'react';

import Layout from '~/layouts/Layout';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';

const product = {
  id: '60ce2b96e605bc26dc86792a',
  name: 'Apple Macbook Air M1 256 GB/13"/8GB - Garansi Resmi iBox - Silver',
  images: [
    {
      id: '5b6654a2-4317-44ba-90f7-6333fa0f7bda',
      filepath: 'product-1/2020/5/7/3252295',
      filename: '3252295_b1d1b268-3789-4989-8b8c-aec212fc2bb8_2048_2048.webp?ect=4g',
      type: 'tokopedia',
    },
  ],
  price: 15399000,
  stock: 50,
  condition: 'New',
  description: 'Garansi Resmi Apple Indonesia 1 Tahun',
  created_at: '2021-06-20T09:09:50.027Z',
  updated_at: '2021-06-20T09:09:50.027Z',
};

const Products = () => {
  return (
    <Layout>
      <div className="container flex flex-wrap px-4 py-6 sm:px-0">
        <div className="flex flex-inline w-full pb-4 px-2">
          <div className="rounded-lg bg-white shadow w-full overflow-hidden">
            <div className="h-auto relative">
              <img
                src={imgHelper(product.images[0], '500-square')}
                alt="product img"
                className="w-full"
              />
            </div>
            <div className="relative p-2 flex flex-col" title={product.name}>
              <div className="mb-1 overflow-hidden line-clamp-2">{product.name}</div>
              <div className="flex justify-between mb-1 text-grey-700 font-bold">
                Rp{priceHelper(product.price)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
