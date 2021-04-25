import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from '@chakra-ui/layout';

import Navbar from '~/components/Navbar';
import Home from '~/views/Home';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container as="main" w="96%" maxW="1200px" p={0}>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Container>
    </>
  );
};

export default MainLayout;
