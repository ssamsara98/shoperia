import { LockClosedIcon } from '@heroicons/react/outline';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authAction } from '~/store/actions';
import ShoperiaLogo from '~/assets/shoperia.svg';
import serverApi from '~/api/server-api';

const Register = () => {
  const dispatch = useDispatch();
  const { authFail, authSuccess } = bindActionCreators(authAction, dispatch);
  const rsAuth = useSelector((state) => state.auth);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  const [isLoginError, setIsLoginError] = useState(false);

  const registerHandler = (data) => {
    serverApi
      .post('/api/v1/auth/register', data)
      .then((resp) => {
        authSuccess(resp.data.data.user);
        setIsLoginError(() => false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          if (err.response.status === 500) {
            dispatch(authFail({ message: err.response.statusText }));
          } else {
            dispatch(authFail(err.response.data.error));
          }
        } else {
          dispatch(authFail(err));
        }
        setIsLoginError(() => true);
      });
    // authFetchLogin(data.user_session, data.password, data.remember_me)
    //   .then(() => {
    //     setIsLoginError(() => false);
    //   })
    //   .catch(() => {
    //     setIsLoginError(() => true);
    //   });
  };

  if (rsAuth.isLoggedIn) {
    return <Redirect to="/" />;
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
            Create New Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(registerHandler)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                {...register('name', { required: true })}
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm`}
                placeholder="Name"
              />
              {errors.firstName?.type === 'required' && 'Name is required'}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                {...register('email', { required: true })}
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm`}
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                {...register('username', { required: true })}
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm`}
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password', { required: true, minLength: 8, maxLength: 32 })}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="sex_type" className="sr-only">
                Sex Type
              </label>
              <select
                {...register('sex_type')}
                name="sex_type"
                id="sex_type"
                defaultValue="Other"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-600 focus:border-sky-600 focus:z-10 sm:text-sm`}
              >
                <option value="Other">Other</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
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
              Submit
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

export default Register;
