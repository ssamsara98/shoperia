import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AccountSidebar from '~/components/Sidebar/AccountSidebar';
import Address from '~/views/Account/Address';
import Profile from '~/views/Account/Profile';

const Account = () => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-1/6">
        <AccountSidebar />
      </div>
      <div className="flex flex-col w-5/6 px-8 pb-5 bg-white">
        <Switch>
          <Route path="/account/profile" component={Profile} />
          <Route path="/account/address" component={Address} />
          <Route path="/account/orders" render={() => <></>} />
          <Route path="/account/*">
            <Redirect to="/account/profile" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Account;
