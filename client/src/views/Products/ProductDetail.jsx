import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bindActionCreators } from 'redux';
import serverApi from '~/api/server-api';
import { productAction } from '~/store/actions';
import imgHelper from '~/utils/img-helper';
import priceHelper from '~/utils/price-helper';

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
//   createdAt: '2021-06-20T09:09:50.027Z',
//   updatedAt: '2021-06-20T09:09:50.027Z',
// };

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const { productSetItem } = bindActionCreators(productAction, dispatch);
  const rsProduct = useSelector((state) => state.product);
  const rsAuth = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [prdImg, setPrdImg] = useState(null);
  const [prdImgSelected, setPrdImgSelected] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartDisable, setCartDisable] = useState(false);

  const getProductId = useCallback(() => {
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
    setProduct(() => rsProduct.item[productId] || product);
    setPrdImg(() => (rsProduct.item[productId] && rsProduct.item[productId].images[0]) || prdImg);
    return () => {};
  }, [rsProduct]);

  // functions

  const imageChanger = (e, idx) => {
    setPrdImg(() => product.images[idx]);
  };
  const imageChangerEnter = (e, idx) => {
    setPrdImgSelected(() => product.images[idx]);
  };
  const imageChangerLeave = (e, idx) => {
    setPrdImgSelected(() => null);
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

  const addToCart = async (e) => {
    e.preventDefault();
    setCartDisable(() => true);

    if (!rsAuth.isLoggedIn) return props.history.push('/login', props.location);
    try {
      await serverApi.post('/api/v1/cart/add-cart-item', {
        productId: product.id,
        quantity,
      });
      toast.dark('Product added', { autoClose: 2000 });
      setCartDisable(() => false);
    } catch (err) {
      setCartDisable(() => false);
    }
  };

  if (notFound) return <Redirect to="/404" from={props.match.url} />;

  return (
    <div className="flex rounded overflow-hidden shadow bg-white">
      <div className="w-1/3 p-4">
        <div className="w-full relative bg-cool-gray-400 mb-3" style={{ paddingBottom: '100%' }}>
          <img
            src={
              prdImgSelected
                ? imgHelper(prdImgSelected, '500-square')
                : prdImg
                ? imgHelper(prdImg, '500-square')
                : ''
            }
            alt={(prdImgSelected && prdImgSelected.id) || (prdImg && prdImg.id)}
            className="absolute top-0 left-0 w-full"
          />
          {product?.stock <= 0 && (
            <img
              src={require('~/assets/sold-out/sold-out_500.png').default}
              alt="product sold-out"
              className="absolute top-0 left-0 w-full"
            />
          )}
        </div>
        <div className="flex flex-wrap -mx-1">
          {product
            ? product.images.map((img, idx) => (
                <div className="w-1/4 p-1" key={img.id}>
                  <div className="w-full relative" style={{ paddingBottom: '100%' }}>
                    <img
                      src={imgHelper(img, '100-square')}
                      alt={img.id}
                      className="absolute top-0 left-0 w-full border hover:border-sky-500"
                      onClick={(e) => imageChanger(e, idx)}
                      onMouseEnter={(e) => imageChangerEnter(e, idx)}
                      onMouseLeave={imageChangerLeave}
                    />
                  </div>
                </div>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
                <div className="w-1/4 p-1" key={el}>
                  <div
                    className="w-full bg-cool-gray-400 animate-pulse"
                    style={{ paddingBottom: '100%' }}
                  ></div>
                </div>
              ))}
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 pt-5 pl-7 pr-8">
          <h1
            className={`text-2xl line-clamp-2${
              product ? '' : ' pb-8 bg-cool-gray-400 animate-pulse'
            }`}
          >
            {product && product.name}
          </h1>
          <div className="flex flex-col mt-3 bg-cool-gray-100 px-7 py-4">
            <p
              className={`text-3xl text-sky-600${
                product ? '' : ' pb-16 bg-cool-gray-400 animate-pulse'
              }`}
            >
              {product && `Rp${priceHelper(product && product.price)}`}
            </p>
          </div>
          <div className="flex flex-auto space-x-5 pb-5">
            <div className="flex flex-col w-2/3 mt-4">
              <p className={`font-bold${product ? '' : ' pb-4 bg-cool-gray-400 animate-pulse'}`}>
                {product && 'Condition'}
              </p>
              <p className={`${product ? '' : ' pb-4 bg-cool-gray-400 animate-pulse'}`}>
                {product && product.condition}
              </p>
              <p className={`font-bold${product ? '' : ' pb-4 bg-cool-gray-400 animate-pulse'}`}>
                {product && 'Weight'}
              </p>
              <p className={`${product ? '' : ' pb-4 bg-cool-gray-400 animate-pulse'}`}>
                {product && `${product.weight} gr`}
              </p>
              <p className={`font-bold${product ? '' : ' pb-4 bg-cool-gray-400 animate-pulse'}`}>
                {product && 'Description'}
              </p>
              <div
                className={`flex flex-1 w-full relative${
                  product ? '' : ' bg-cool-gray-400 animate-pulse'
                }`}
              >
                <p className="absolute top-0 left-0 w-ful h-full pb-5 overflow-auto">
                  {product && product.description}
                </p>
              </div>
            </div>
            <div
              className={`w-1/3 flex flex-col space-y-2 mt-4${
                product ? '' : ' pb-10 bg-cool-gray-400 animate-pulse'
              }`}
            >
              {product && (
                <>
                  <p className="text-sm text-center">{product && `Stock: ${product.stock}`}</p>
                  <div className="flex w-full justify-center">
                    <button
                      className="w-12 text-2xl text-center border border-cool-gray-300 active:bg-cool-gray-200 disabled:bg-cool-gray-300"
                      onClick={() => changeQuantity('dec')}
                      disabled={product?.stock <= 0}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-12 flex-1 text-center border-cool-gray-300"
                      value={quantity}
                      disabled={product?.stock <= 0}
                      onChange={changeQuantityText}
                      onKeyDown={changeQuantityKeypress}
                    />
                    <button
                      className="w-12 text-2xl text-center border border-cool-gray-300 active:bg-cool-gray-200 disabled:bg-cool-gray-300"
                      onClick={() => changeQuantity('inc')}
                      disabled={product?.stock <= 0}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="h-12 px-3 bg-sky-600 active:bg-sky-800 hover:bg-sky-700 text-white disabled:opacity-75 disabled:bg-sky-600"
                    disabled={cartDisable || product?.stock <= 0}
                    onClick={addToCart}
                  >
                    <FontAwesomeIcon icon={faOpencart} className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    className="h-12 px-8 border border-sky-600 hover:bg-cool-gray-100 active:bg-cool-gray-200 text-sky-600"
                    onClick={favoriteHandler}
                  >
                    <FontAwesomeIcon
                      icon={isFavorite ? fasHeart : farHeart}
                      className="mr-2 text-red-600"
                    />
                    Favorite
                  </button>
                  <ToastContainer />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
