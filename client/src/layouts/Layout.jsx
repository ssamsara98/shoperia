import React from 'react';

import Navbar from '~/component/Navbar/MainNavbar';

const Layout = (props) => {
  return (
    <>
      <header className="bg-white shadow">
        <Navbar />
      </header>
      <main>
        <div className="max-w-screen-xl mx-auto py-6 sm:px-6 lg:px-8">{props.children}</div>
      </main>
    </>
  );
};

export default Layout;
