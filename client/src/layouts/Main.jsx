import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '~/components/Footer/Footer';
import LoadingScreen from '~/components/Loading/LoadingScreen';
import Navbar from '~/components/Navbar/MainNavbar';
import ProtectedRoute from '~/components/Shared/ProtectedRoute';

const Index = React.lazy(() => import('~/views/Index'));
const Cart = React.lazy(() => import('~/views/Cart'));
const Products = React.lazy(() => import('~/views/Products'));
const ProductDetail = React.lazy(() => import('~/views/Products/ProductDetail'));

const Main = () => {
  return (
    <>
      <header className="bg-white shadow mt-16">
        <Navbar />
      </header>
      <Suspense fallback={<LoadingScreen />}>
        <main className="max-w-screen-xl mx-auto py-6 sm:px-6 lg:px-8">
          <Switch>
            <Route path="/products/:product" component={ProductDetail} />
            <Route path="/products" component={Products} />
            <ProtectedRoute path="/cart" component={Cart} />
            <Route path="/" exact component={Index} />
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </main>
      </Suspense>
      <footer className="mt-auto flex justify-center py-2">
        <Footer />
      </footer>
    </>
  );
};

export default Main;
