import { LockClosedIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authAction } from '~/store/actions';
import ShoperiaLogo from '~/assets/shoperia.svg';

const Login = (props) => {
  const dispatch = useDispatch();
  const { authFetchLogin } = bindActionCreators(authAction, dispatch);
  const rsAuth = useSelector((state) => state.auth);
  const { handleSubmit, register } = useForm();
  const [isLoginError, setIsLoginError] = useState(false);

  const loginHandler = (data) => {
    authFetchLogin(data.user_session, data.password, data.remember_me)
      .then(() => {
        setIsLoginError(() => false);
      })
      .catch(() => {
        setIsLoginError(() => true);
      });
  };

  if (rsAuth.isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: props.location.state?.pathname || '/',
          search: props.location.state?.search || '',
        }}
      />
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div
            className="mx-auto h-12 w-auto"
            style={{
              backgroundColor: '#0284c7',
              WebkitMask: `url(${ShoperiaLogo}) no-repeat center`,
              mask: `url(${ShoperiaLogo}) no-repeat center`,
            }}
          ></div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(loginHandler)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="user_session" className="sr-only">
                Email/Username
              </label>
              <input
                {...register('user_session')}
                id="user_session"
                name="user_session"
                type="username"
                autoComplete="email-username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm"
                placeholder="Email/Username: samara98@mailsac.com/samara98"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm"
                placeholder="Password: asdf1234"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-500 focus:ring-sky-600 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label> */}
            </div>

            <div className="text-sm">
              <a href="#!" className="font-medium text-indigo-500 hover:text-sky-600">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 focus:ring-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-75"
              disabled={rsAuth.loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className={`h-5 w-5 ${
                    rsAuth.loading ? 'text-gray-200' : 'text-sky-300 group-hover:text-sky-200'
                  }`}
                  aria-hidden="true"
                />
              </span>
              Login
            </button>
          </div>
        </form>
        {isLoginError && (
          <div className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
            {rsAuth.error.message}
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
