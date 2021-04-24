import * as React from 'react';
import { Route, Switch } from 'react-router';

import Dashboard from '~/views/Dashboard';

const DashboardLayout = () => {
  return (
    <>
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </>
  );
};

export default DashboardLayout;
