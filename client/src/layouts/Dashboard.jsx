import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Box, Flex } from '@chakra-ui/layout';

import Sidebar from '~/components/Sidebar';

// views
import Dashboard from '~/views/Dashboard';

const DashboardLayout = () => {
  return (
    <>
      <Flex>
        <Sidebar />
        <Box as="main" flex="1 0" h="100vh" bg="gray.200">
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </Box>
      </Flex>
    </>
  );
};

export default DashboardLayout;
