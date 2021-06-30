import React, { useLayoutEffect, useState } from 'react';
import Slider from 'react-slick';
import serverApi from '~/api/server-api';
import ProductCard from '~/components/Card/ProductCard';
import ProductCardSkeleton from '~/components/Card/ProductCardSkeleton';

const banners = ['banner-1.jpg', 'banner-2.webp', 'banner-3.webp', 'banner-4.webp'];

function SampleArrow({ className, style, newStyle, onClick }) {
  return (
    <button
      className={`${className} w-8 h-12 z-10`}
      style={{ ...style, ...newStyle, backgroundColor: 'rgba(0,0,0,0.25)' }}
      onClick={onClick}
    />
  );
}

const Index = () => {
  const [products, setProducts] = useState([]);
  useLayoutEffect(() => {
    async function fetchProducts() {
      try {
        const prodsResp = await serverApi.get('/api/v1/product/get-product-list');
        setProducts(() => [...prodsResp.data.data]);
      } catch (err) {}
    }
    fetchProducts();
    return () => {};
  }, []);

  return (
    <>
      <div className="px-4 py-6 sm:px-0">
        {/* <div className="border-4 border-dashed border-gray-400 rounded-lg h-96" /> */}
        <Slider
          className="mb-5"
          dots
          infinite
          autoplay
          autoplaySpeed={5000}
          pauseOnHover
          prevArrow={<SampleArrow newStyle={{ left: '0' }} />}
          nextArrow={<SampleArrow newStyle={{ right: '0' }} />}
        >
          {banners.map((banner, idx) => (
            <div key={idx}>
              <div
                style={{
                  paddingBottom: '25%',
                  backgroundImage: `url("${require(`~/assets/banners/${banner}`).default}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-wrap sm:px-0">
        {products.length === 0
          ? [...new Array(20).keys()].map((key) => <ProductCardSkeleton key={key} />)
          : products.map((product, idx) => (
              <ProductCard product={product} key={product.id + idx} />
            ))}
      </div>
    </>
  );
};

export default Index;
