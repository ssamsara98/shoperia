import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '~/components/Sidebar/AdminSidebar';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

const Admin = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-gray-100">
        <div className="px-4 md:px-10 mx-auto w-full py-6 sm:px-6 lg:px-8">
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
