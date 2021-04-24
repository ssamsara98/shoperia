import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DashboardLayout from './layouts/Dashboard';
import MainLayout from './layouts/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={DashboardLayout} />
        <Route path="/" component={MainLayout} />
      </Switch>
    </Router>
  );
}

export default App;
