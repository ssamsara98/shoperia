import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '~/components/Sidebar/AdminSidebar';
import Dashboard from '~/views/Admin/Dashboard';

const Admin = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-gray-100">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-8 py-6 mx-auto">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin">
              <Redirect from="/admin/*" to="/admin/dashboard" />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Admin;
