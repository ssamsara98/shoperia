import React, { useEffect, useState } from 'react';

import serverApi from '~/api/server-api';
import Layout from '~/layouts/Layout';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';
import NotFound from '../404';

// const product = {
//   id: '60ce2b96e605bc26dc86792a',
//   name: 'Apple Macbook Air M1 256 GB/13"/8GB - Garansi Resmi iBox - Silver',
//   images: [
//     {
//       id: '5b6654a2-4317-44ba-90f7-6333fa0f7bda',
//       filepath: 'product-1/2020/5/7/3252295',
//       filename: '3252295_b1d1b268-3789-4989-8b8c-aec212fc2bb8_2048_2048.webp?ect=4g',
//       type: 'tokopedia',
//     },
//   ],
//   price: 15399000,
//   stock: 50,
//   condition: 'New',
//   description: 'Garansi Resmi Apple Indonesia 1 Tahun',
//   created_at: '2021-06-20T09:09:50.027Z',
//   updated_at: '2021-06-20T09:09:50.027Z',
// };

const Products = (props) => {
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct(productId) {
      try {
        const prodResp = await serverApi.get(`/api/v1/product/get-product/${productId}`);
        setProduct(() => prodResp.data.data);
      } catch (err) {
        setNotFound(() => true);
      }
    }

    const isMongoId = /^[0-9a-fA-F]{24}$/;
    const productName = props.match.params.product.split('-i.');
    const productId = productName[productName.length - 1];
    console.log(productId);

    if (isMongoId.test(productId)) fetchProduct(productId);
    else {
      setNotFound(() => true);
    }
    return () => {
      setNotFound(() => false);
    };
  }, []);

  if (notFound) return <NotFound />;

  return (
    <Layout>
      <div className="container flex flex-wrap px-4 py-6 sm:px-0">
        <div className="flex flex-inline w-1/2 pb-4 px-2 mx-auto">
          <div className="rounded-lg bg-white shadow w-full overflow-hidden">
            <div
              className={`h-auto relative bg-gray-400${product ? '' : ' animate-pulse'}`}
              style={{ paddingBottom: '100%' }}
            >
              {product && (
                <img
                  src={imgHelper(product.images[0], '500-square')}
                  alt="product img"
                  className="w-full absolute"
                />
              )}
            </div>
            <div className="relative p-2 flex flex-col" title={product && product.name}>
              <div
                className={`mb-1 overflow-hidden line-clamp-2${
                  product ? '' : ' bg-gray-400 rounded pb-8 animate-pulse'
                }`}
              >
                {product && product.name}
              </div>
              <div
                className={`flex justify-between mb-1 text-grey-700 font-bold${
                  product ? '' : ' bg-gray-400 rounded pb-8 animate-pulse'
                }`}
              >
                {product && `Rp${priceHelper(product.price)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
