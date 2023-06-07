import {
  HiOutlineMenuAlt2,
  HiOutlineSearch,
  HiUserCircle,
  HiOutlineCog,
  HiOutlineBell,
} from 'react-icons/hi';
import IconButton from '../components/buttons/IconButton';

function Navbar({ setIsSidebarOpen }) {
  return (
    <nav className="sticky top-0 flex items-center justify-between w-full px-6 py-4 bg-white drop-shadow h-[64px]">
      <div className="flex gap-2">
        <IconButton
          onClick={() => setIsSidebarOpen((prevState) => !prevState)}
          icon={HiOutlineMenuAlt2}
          color="gray"
          size="6"
        />
        <IconButton icon={HiOutlineSearch} color="gray" size="6" />
      </div>
      <div className="flex items-center gap-10">
        <div className="flex gap-2">
          <IconButton icon={HiOutlineBell} color="gray" size="6" />
          <IconButton icon={HiOutlineCog} color="gray" size="6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <p className="text-sm font-semibold text-gray-900">Bgs Darmika</p>
            <p className="text-xs text-gray-700">Admin</p>
          </div>
          <IconButton icon={HiUserCircle} color="blue" size="6" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
