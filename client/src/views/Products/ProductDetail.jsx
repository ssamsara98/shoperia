import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';

import serverApi from '~/api/server-api';
import Layout from '~/layouts/Layout';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';
import { productAction } from '~/store/actions';
import NotFound from '../404';

// const product = {
//   id: '60ce2b96e605bc26dc86792a',
//   name: 'Apple MacBook Pro (13.3inci, 2020, Empat Thunderbolt 3) 2.0GHZ, 16GB RAM, 1TB SSD, Space Grey',
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
  const dispatch = useDispatch();
  const { productSetItem } = bindActionCreators(productAction, dispatch);
  const rsProduct = useSelector((state) => state.product);
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [prdImg, setPrdImg] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const getProductId = useCallback(() => {
    console.log('useCallback');
    const productName = props.match.params.product.split('-i.');
    return productName[productName.length - 1];
  }, [props]);

  useLayoutEffect(() => {
    async function fetchProduct(productId) {
      try {
        const prodResp = await serverApi.get(`/api/v1/product/get-product/${productId}`);
        setTimeout(() => {
          productSetItem(prodResp.data.data);
        }, 1000);
      } catch (err) {
        setNotFound(() => true);
      }
    }

    const isMongoId = /^[0-9a-fA-F]{24}$/;
    const productId = getProductId();

    if (isMongoId.test(productId)) {
      setProduct(() => rsProduct.item[productId] || null);
      setPrdImg(() => (rsProduct.item[productId] && rsProduct.item[productId].images[0]) || '');
      fetchProduct(productId);
    } else {
      setNotFound(() => true);
    }
    return () => {
      setNotFound(() => false);
    };
  }, []);

  useEffect(() => {
    const productId = getProductId();
    console.log(productId);
    console.log(rsProduct);
    setProduct(() => rsProduct.item[productId] || product);
    setPrdImg(() => (rsProduct.item[productId] && rsProduct.item[productId].images[0]) || prdImg);
    return () => {};
  }, [rsProduct]);

  // functions

  const imageChanger = (e, idx) => {
    e.preventDefault();
    setPrdImg(() => product.images[idx]);
  };

  const checkQuantity = (val) => {
    if (val > 0 && val <= product.stock) return val;
    if (val > product.stock) return product.stock;
    if (val < 1) return 1;
    return quantity;
  };

  const changeQuantity = (type) => {
    switch (type) {
      case 'inc':
        setQuantity((val) => checkQuantity(val + 1));
        break;
      case 'dec':
        setQuantity((val) => checkQuantity(val - 1));
        break;
      default:
        break;
    }
  };

  const changeQuantityText = (e) => {
    if (e.target.value === '') setQuantity(() => 1);
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setQuantity(() => checkQuantity(val));
    }
  };

  const changeQuantityKeypress = (e) => {
    if (e.key === 'ArrowUp') {
      changeQuantity('inc');
    }
    if (e.key === 'ArrowDown') {
      changeQuantity('dec');
    }
  };

  const favoriteHandler = (e) => {
    e.preventDefault();
    setIsFavorite((val) => !val);
  };

  if (notFound) return <NotFound />;

  return (
    <Layout>
      <div className="flex rounded overflow-hidden shadow">
        <div className="w-1/3 p-4">
          <div className="w-full relative bg-gray-300 mb-3" style={{ paddingBottom: '100%' }}>
            <img
              src={prdImg ? imgHelper(prdImg, '500-square') : ''}
              alt={prdImg && prdImg.id}
              className="absolute top-0 left-0 w-full"
            />
          </div>
          <div className="flex flex-wrap -mx-1">
            {product &&
              product.images.map((img, idx) => (
                <div className="w-1/4 p-1" key={img.id}>
                  <div className="w-full relative" style={{ paddingBottom: '100%' }}>
                    <img
                      src={imgHelper(img, '100-square')}
                      alt={img.id}
                      className="absolute top-0 left-0 w-full border-2 hover:border-sky-500"
                      onMouseEnter={(e) => imageChanger(e, idx)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-1">
          <div className="flex-auto pt-5 pl-7 pr-8">
            <p
              className={`text-2xl line-clamp-2${product ? '' : ' pb-8 bg-gray-200 animate-pulse'}`}
            >
              {product && product.name}
            </p>
            <div className="flex flex-col mt-3 bg-gray-100 px-7 py-4">
              <p
                className={`text-3xl text-sky-600${
                  product ? '' : ' pb-16 bg-gray-200 animate-pulse'
                }`}
              >
                {product && `Rp${priceHelper(product && product.price)}`}
              </p>
            </div>
            <div className="flex space-x-5 pb-5">
              <div className="w-1/2 mt-4">
                <p className={`font-bold${product ? '' : ' pb-4 bg-gray-200 animate-pulse'}`}>
                  {product && 'Description'}
                </p>
                <div
                  className={`w-full relative${product ? '' : ' bg-gray-200 animate-pulse'}`}
                  style={{ paddingBottom: '100%' }}
                >
                  <p className="absolute top-0 left-0 w-ful h-full pb-5 overflow-auto">
                    {product && product.description}
                  </p>
                </div>
              </div>
              <div
                className={`w-1/2 flex flex-col space-y-2 mt-4${
                  product ? '' : ' pb-10 bg-gray-200 animate-pulse'
                }`}
              >
                {product && (
                  <>
                    <p className="text-sm text-center">{product && `Stock: ${product.stock}`}</p>
                    <div className="flex w-full justify-center">
                      <button
                        className="w-12 text-2xl text-center border-2"
                        onClick={() => changeQuantity('dec')}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-12 text-center"
                        value={quantity}
                        onChange={changeQuantityText}
                        onKeyDown={changeQuantityKeypress}
                      />
                      <button
                        className="w-12 text-2xl text-center border-2"
                        onClick={() => changeQuantity('inc')}
                      >
                        +
                      </button>
                    </div>

                    <button className="h-12 px-3 bg-sky-600 hover:bg-sky-700 focus:bg-sky-800 text-white">
                      <FontAwesomeIcon icon={faOpencart} className="mr-2" />
                      Add to Cart
                    </button>
                    <button
                      className="h-12 px-8 border-2 border-sky-600 hover:border-sky-700 focus:border-sky-800 text-sky-600 hover:text-sky-700 focus:text-sky-800"
                      onClick={favoriteHandler}
                    >
                      <FontAwesomeIcon
                        icon={isFavorite ? fasHeart : farHeart}
                        className="mr-2 text-red-600"
                      />
                      Favorite
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
