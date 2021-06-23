import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="w-full h-full fixed flex justify-center items-center">
      <span className="text-sky-600 opacity-75">
        <FontAwesomeIcon icon={faCircleNotch} size="10x" spin />
      </span>
    </div>
  );
};

export default LoadingScreen;
