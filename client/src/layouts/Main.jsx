import * as React from 'react';
import { Route, Switch } from 'react-router';

import Navbar from '~/components/Navbar';
import Home from '~/views/Home';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
};

export default MainLayout;
