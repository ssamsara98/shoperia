import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DashboardLayout from './layouts/Dashboard';
import MainLayout from './layouts/Main';
import { authLogin } from './redux/actions/auth-action';

function App(props) {
  React.useLayoutEffect(
    () => {
      props.raAuthLogin();
      return () => {};
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={DashboardLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  raAuthLogin: authLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
