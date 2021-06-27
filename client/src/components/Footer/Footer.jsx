import React from 'react';

const Footer = () => {
  return (
    <div className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
      © {new Date().getFullYear()} Shoperia —
      <a
        href="https://github.com/samara98"
        className="text-gray-500 ml-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sulthon Abdul Malik
      </a>
    </div>
  );
};

export default Footer;
