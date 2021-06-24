import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoadingScreen from './components/Loading/LoadingScreen';
import Main from './layouts/Main';
import { authAction } from './store/actions';
import NotFound from './views/404';
import Login from './views/Login';

const App = (props) => {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    props
      .raAuthFetchMe()
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
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/404" component={NotFound} />
        <Route path="/" component={Main} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  rsAuth: state.auth,
});

const mapDispatchToProps = {
  raAuthFetchMe: authAction.authFetchMe,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App);
