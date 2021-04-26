import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from '@chakra-ui/layout';

import Navbar from '~/components/Navbar';

// views
const Home = React.lazy(() => import('~/views/Home'));
const Login = React.lazy(() => import('~/views/auth/Login'));

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Container as="main" w="96%" maxW="1200px" p={0}>
          <Switch>
            <Route path="/login" exact render={(props) => <Login {...props} />} />
            <Route path="/" exact render={(props) => <Home {...props} />} />
          </Switch>
        </Container>
      </React.Suspense>
    </>
  );
};

export default MainLayout;
