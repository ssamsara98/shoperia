import { faMap, faUser } from '@fortawesome/free-regular-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const AccountSidebar = () => {
  const rsAuth = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex items-center h-20 py-4 space-x-4">
        <div className="h-12 w-12 bg-white rounded-full">
          <img
            className="w-full"
            src={`https://detteksie-mybucket.s3.amazonaws.com/${rsAuth.user.avatar}`}
            alt="Avatar"
          />
        </div>
        <h1>{rsAuth.user?.username}</h1>
      </div>
      <div className="flex flex-col space-y-4 h-20 pt-8">
        <NavLink to="/account/profile" exact activeClassName="text-sky-600">
          <div className="w-4 h-4 mr-4 inline-block relative text-center">
            <FontAwesomeIcon icon={faUser} />
          </div>
          Profile
        </NavLink>
        <NavLink to="/account/address" exact activeClassName="text-sky-600">
          <div className="w-4 h-4 mr-4 inline-block relative text-center">
            <FontAwesomeIcon icon={faMap} />
          </div>
          Address
        </NavLink>
        <NavLink to="/account/Orders" exact activeClassName="text-sky-600">
          <div className="w-4 h-4 mr-4 inline-block relative text-center">
            <FontAwesomeIcon icon={faReceipt} />
          </div>
          Orders
        </NavLink>
      </div>
    </>
  );
};

export default AccountSidebar;
