import React, { Suspense, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoadingScreen from './component/Loading/LoadingScreen';
import { authAction } from './store/actions';

const Index = React.lazy(() => import('./views/Index'));
const Login = React.lazy(() => import('./views/Login'));

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
          <Route path="/login" component={Login} />
          <Route path="/" component={Index} />
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
