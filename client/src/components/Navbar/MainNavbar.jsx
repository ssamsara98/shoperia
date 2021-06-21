import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { authAction } from '~/store/actions';

const navigations = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const dispatch = useDispatch();
  const { authFetchLogout } = bindActionCreators(authAction, dispatch);
  const rsAuth = useSelector((state) => state.auth);

  const logoutHandler = (e) => {
    e.preventDefault();
    authFetchLogout();
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigations.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        exact
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {rsAuth.isLoggedIn ? (
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={`https://detteksie-mybucket.s3.amazonaws.com/${rsAuth.user.avatar}`}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="#"
                                  className={classNames(
                                    active ? 'bg-gray-200' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            {/* <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="#"
                                  className={classNames(
                                    active ? 'bg-gray-200' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  Settings
                                </Link>
                              )}
                            </Menu.Item> */}
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="#"
                                  className={classNames(
                                    active ? 'bg-gray-200' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                  onClick={logoutHandler}
                                >
                                  Logout
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="ml-3 px-4 py-2 rounded bg-blue-500 focus:bg-blue-600 hover:bg-blue-700 text-white font-bold focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="ml-3 px-4 py-2 rounded border-2 border-blue-500 focus:border-blue-600 hover:border-blue-700 text-white font-bold focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigations.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  exact
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
