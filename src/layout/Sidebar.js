/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineViewGridAdd,
  HiOutlineShoppingCart,
  HiOutlineLogout,
  HiXCircle,
} from 'react-icons/hi';
import clsx from 'clsx';
import logo from '../assets/logo.svg';
import Dropdown from '../components/dropdown/Dropdown';
import IconButton from '../components/buttons/IconButton';
import NavigationLink from '../components/link/NavigationLink';
import { signOutUser } from '../auth/auth';

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out', error);
    }
  };
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className={clsx(
        'fixed z-50 md:sticky top-0 left-0  h-screen transition-all flex',
        isSidebarOpen ? 'w-64' : 'w-0 opacity-0 pointer-events-none',
      )}
      aria-label="Sidebar"
    >
      {/* content */}
      <div className="z-10 w-full h-full overflow-y-auto bg-gray-50 dark:bg-green-800">
        <div className="flex items-center p-3 space-x-2 font-medium text-white h-[64px] border-b-[1px]">
          <img src={logo} alt="logo" />
          <p>Prathama Land</p>
        </div>
        <ul className="px-3 py-4 space-y-2 overflow-x-visible font-medium">
          <NavigationLink
            to="/"
            title="Dashboard"
            icon={HiOutlineViewGrid}
          />
          <Dropdown
            title="Properti"
            icon={<HiOutlineViewGridAdd className="w-6 h-6 text-white" />}
            content={[
              { id: 1, title: 'Daftar properti' },
              { id: 2, title: 'Tambah properti' },
            ]}
          />
          <Dropdown
            title="Pemesanan"
            icon={<HiOutlineShoppingCart className="w-6 h-6 text-white" />}
            content={[
              { id: 1, title: 'Daftar Pemesanan' },
            ]}
          />
          <li onClick={handleSignOut}>
            <Link
              to="/login"
              className="flex items-center p-2 text-white rounded-lg hover:bg-green-700"
            >
              <HiOutlineLogout className="w-6 h-6 text-white" />
              <span className="ml-3">Keluar</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* black overlay */}
      <div className="absolute inset-0 block w-screen h-screen bg-black/70 md:hidden">
        {/* toggle button */}
        <div className="absolute top-4 left-64 ">
          <IconButton
            onClick={() => setIsSidebarOpen(false)}
            icon={HiXCircle}
            color="white"
            size="6"
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
