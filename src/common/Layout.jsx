import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-700 text-white p-4 flex justify-center gap-4">
          <Link to="/main">Main</Link>
          <Link to="/sample">Sample</Link>
        </div>
        <div className="flex-1 p-3">
          <main className="h-[89vh]">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
