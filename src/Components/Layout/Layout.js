import React from 'react';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="App bg-light min-vh-100">
      <Navbar />
      <main className="py-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;