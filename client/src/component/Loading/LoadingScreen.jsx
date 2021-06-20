import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="w-full h-full bg-gray-200 fixed flex justify-center items-center">
      <span className="text-green-500 opacity-75">
        <i className="xl:text-8xl md:text-6xl text-4xl">Loading...</i>
      </span>
    </div>
  );
};

export default LoadingScreen;
