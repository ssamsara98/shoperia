import React, { Suspense, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoadingScreen from './components/Loading/LoadingScreen';
import { authAction } from './store/actions';
import NotFound from './views/404';
import Index from './views/Index';

const Login = React.lazy(() => import('./views/Login'));
const Products = React.lazy(() => import('./views/Products'));
const ProductDetail = React.lazy(() => import('./views/Products/ProductDetail'));

const App = (props) => {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    props
      .authFetchMe()
      .then(() => {
        setLoading(() => false);
      })
      .catch(() => {
        setLoading(() => false);
      });
    return () => {};
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route path="/products/:product" component={ProductDetail} />
          <Route path="/products" component={Products} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Index} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  rsAuth: state.auth,
});

const mapDispatchToProps = {
  authFetchMe: authAction.authFetchMe,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App);
