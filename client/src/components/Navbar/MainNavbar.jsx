import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authAction } from '~/store/actions';

const navigations = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = withRouter((props) => {
  const dispatch = useDispatch();
  const { authFetchLogout } = bindActionCreators(authAction, dispatch);
  const rsAuth = useSelector((state) => state.auth);

  const logoutHandler = (e) => {
    e.preventDefault();
    authFetchLogout();
  };

  return (
    <Disclosure as="nav" className="bg-sky-600 fixed top-0 left-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cool-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                    src={require('~/assets/shoperia.png').default}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={require('~/assets/shoperia.png').default}
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
                        className="text-white hover:bg-sky-700 px-3 py-2 rounded-md text-sm font-medium"
                        activeClassName="bg-sky-800 text-white px-3 py-2 rounded-md text-sm font-medium"
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
                  <>
                    <Link to="/cart" className="text-white">
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>

                    <Menu as="div" className="ml-4 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-sky-600 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={`https://detteksie-mybucket.s3.amazonaws.com/${rsAuth.user.avatar}`}
                                alt="Avatar"
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
                              {rsAuth.user?.admin && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={{ hash: '#' }}
                                      className={classNames(
                                        active ? 'bg-cool-gray-200' : '',
                                        'block px-4 py-2 text-sm text-gray-700',
                                      )}
                                    >
                                      Admin
                                    </Link>
                                  )}
                                </Menu.Item>
                              )}
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/account/profile"
                                    className={classNames(
                                      active ? 'bg-cool-gray-200' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    Your Profile
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/account/orders"
                                    className={classNames(
                                      active ? 'bg-cool-gray-200' : '',
                                      'block px-4 py-2 text-sm text-gray-700',
                                    )}
                                  >
                                    Orders
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to={{ hash: '#' }}
                                    className={classNames(
                                      active ? 'bg-cool-gray-200' : '',
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
                  </>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to={{ pathname: '/login', state: props.location }}
                      className="hidden sm:block px-4 py-2 rounded bg-white hover:bg-cool-gray-200 active:bg-cool-gray-300 text-sky-600 font-bold focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      Login
                    </Link>
                    <Link
                      to={{ pathname: '/register', state: props.location }}
                      className="hidden sm:block px-4 py-2 rounded border border-white hover:bg-sky-700 active:bg-sky-800 text-white font-bold focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      Register
                    </Link>
                  </div>
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
                  className="text-white hover:bg-sky-700 block px-3 py-2 rounded-md text-base font-medium"
                  activeClassName="bg-sky-800 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </NavLink>
              ))}
              {rsAuth.isLoggedIn ||
                [
                  { name: 'Login', href: '/login' },
                  { name: 'Register', href: '/register' },
                ].map((item) => (
                  <NavLink
                    key={item.name}
                    to={{ pathname: item.href, state: props.location }}
                    exact
                    className="bg-white hover:bg-cool-gray-200 active:bg-cool-gray-300 text-sky-600 block px-3 py-2 rounded-md text-base font-medium"
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
});

export default Navbar;
