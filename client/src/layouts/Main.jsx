import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from '@chakra-ui/layout';

import Navbar from '~/components/Navbar';
import Home from '~/views/Home';
import Login from '~/views/auth/Login';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container as="main" w="96%" maxW="1200px" p={0}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Container>
    </>
  );
};

export default MainLayout;
