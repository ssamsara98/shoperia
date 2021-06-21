import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { authAction } from '~/store/actions';

const Login = () => {
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
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(loginHandler)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email/Username
              </label>
              <input
                {...register('user_session')}
                id="user_session"
                name="user_session"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email/Username"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label> */}
            </div>

            <div className="text-sm">
              <a href="#!" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                rsAuth.loading ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={rsAuth.loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className={`h-5 w-5 ${
                    rsAuth.loading ? 'text-gray-200' : 'text-indigo-300 group-hover:text-indigo-200'
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
    </div>
  );
};

export default Login;