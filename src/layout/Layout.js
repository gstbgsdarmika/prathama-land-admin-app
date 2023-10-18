import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { usePathname } from '../utils/useLocation';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const pathName = usePathname();

  useEffect(() => {
    setIsSidebarOpen(true);
  }, [pathName]);

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-grow ">
        <header className="sticky top-0 z-10">
          <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        </header>
        <main className="flex-grow px-4 py-4 bg-gray-100 md:py-8 md:px-6">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
