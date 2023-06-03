import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const rsAuth = useSelector((state) => state.auth);
  const uploadRef = useRef(null);

  return (
    <>
      <div className="flex items-center py-4">
        <h1 className="text-lg">My Profile</h1>
      </div>
      <hr className="border border-black" />
      <div className="flex pt-8">
        <div className="w-full pr-12">
          <form className="mb-8">
            <div className="flex items-center mb-5">
              <div className="w-1/5 text-right overflow-hidden">
                <label htmlFor="username">Username</label>
              </div>
              <div className="w-4/5 pl-5">
                <span>{rsAuth.user.username}</span>
              </div>
            </div>
            <div className="flex items-center mb-5">
              <div className="w-1/5 text-right overflow-hidden">
                <label htmlFor="name">Name</label>
              </div>
              <div className="w-4/5 pl-5">
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  defaultValue={rsAuth.user.name}
                />
              </div>
            </div>
            <div className="flex items-center mb-5">
              <div className="w-1/5 text-right overflow-hidden">
                <label htmlFor="email">Email</label>
              </div>
              <div className="w-4/5 pl-5">
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  defaultValue={rsAuth.user.email}
                />
              </div>
            </div>
            <div className="flex items-center mb-5">
              <div className="w-1/5 text-right overflow-hidden">
                <label htmlFor="sexType">Sex Type</label>
              </div>
              <div className="w-4/5 pl-5">
                <select
                  defaultValue={rsAuth.user.sexType}
                  id="sexType"
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="Other">Other</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="flex items-center mb-5">
              <div className="w-1/5 text-right overflow-hidden">
                <label htmlFor="birthdate">Birthdate</label>
              </div>
              <div className="w-4/5 pl-5">
                <input
                  type="date"
                  id="birthdate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  defaultValue={
                    rsAuth.user.birthdate &&
                    new Date(rsAuth.user.birthdate || '').toISOString().split('T')[0]
                  }
                />
              </div>
            </div>
            <div className="flex items-center mb-5" style={{ paddingLeft: 'calc(20% + 1.25rem)' }}>
              <button
                type="button"
                className="px-3 py-2 rounded bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/3 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 my-5 bg-cool-gray-300 rounded-full">
              <img
                className="w-full"
                src={`https://${process.env.REACT_APP_AWS_BUCKET}.s3.amazonaws.com/${rsAuth.user.avatar}`}
                alt="Avatar"
              />
            </div>
            <input type="file" accept=".jpg,.jpeg,.png" ref={uploadRef} className="hidden" />
            <button
              type="button"
              className="px-3 py-2 rounded bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white"
              onClick={() => uploadRef.current.click()}
            >
              Choose an Image
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
