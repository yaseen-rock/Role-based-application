import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
