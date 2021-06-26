import React, { useLayoutEffect, useState } from 'react';
import serverApi from '~/api/server-api';
import ProductCard from '~/components/Card/ProductCard';
import ProductCardSkeleton from '~/components/Card/ProductCardSkeleton';

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
        <div className="border-4 border-dashed border-gray-400 rounded-lg h-96" />
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
