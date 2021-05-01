import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Box, Flex } from '@chakra-ui/layout';

import Sidebar from '~/components/Sidebar';
import NavbarDashboard from '~/components/NavbarDashboard';

// views
import Dashboard from '~/views/Dashboard';
import ProductList from '~/views/product/ProductList';
import ProductNew from '~/views/product/ProductNew';

const DashboardLayout = () => {
  return (
    <>
      <Flex>
        <Sidebar />
        <Box as="main" flex="1 0" h="100vh" bg="gray.200" display="flex" flexDir="column">
          <NavbarDashboard />
          <Box paddingX={6} paddingTop={4} paddingBottom={12} flex={1} overflow="auto">
            <Switch>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/dashboard/product" exact component={ProductList} />
              <Route path="/dashboard/product/new" exact component={ProductNew} />
            </Switch>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default DashboardLayout;
