import React from 'react';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="App bg-light min-vh-100">
      <Navbar />
      <main className="flex-1 py-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;