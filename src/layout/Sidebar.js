import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineViewGridAdd,
  HiOutlineShoppingCart,
  HiOutlineQuestionMarkCircle,
  HiOutlineLogout,
  HiXCircle,
} from 'react-icons/hi';
import clsx from 'clsx';
import logo from '../assets/logo.svg';
import Dropdown from '../components/dropdown/Dropdown';
import IconButton from '../components/buttons/IconButton';
import NavigationLink from '../components/link/NavigationLink';

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
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
            title="Properties"
            icon={<HiOutlineViewGridAdd className="w-6 h-6 text-white" />}
            content={[
              { id: 1, title: 'Property list' },
              { id: 2, title: 'New property' },
            ]}
          />
          <Dropdown
            title="Reservations"
            icon={<HiOutlineShoppingCart className="w-6 h-6 text-white" />}
            content={[
              { id: 4, title: 'Reservations List' },
              { id: 5, title: 'Reservation Reports' },
              { id: 6, title: 'Payment Integration' },
            ]}
          />
          <Dropdown
            title="Help Center"
            icon={
              <HiOutlineQuestionMarkCircle className="w-6 h-6 text-white" />
            }
            content={[
              { id: 4, title: 'Reservations List' },
              { id: 5, title: 'Reservation Reports' },
              { id: 6, title: 'Payment Integration' },
            ]}
          />
          <li>
            <Link
              to="/"
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
