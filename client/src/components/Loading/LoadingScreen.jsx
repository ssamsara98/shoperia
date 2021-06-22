import React from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoadingScreen = () => {
  return (
    <div className="w-full h-full bg-gray-200 fixed flex justify-center items-center">
      <span className="text-green-500 opacity-75">
        <FontAwesomeIcon icon={faCircleNotch} size="10x" spin />
      </span>
    </div>
  );
};

export default LoadingScreen;
