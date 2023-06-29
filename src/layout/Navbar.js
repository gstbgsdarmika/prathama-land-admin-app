import {
  HiOutlineMenuAlt2,
  HiOutlineSearch,
  HiOutlineCog,
  HiOutlineBell,
} from 'react-icons/hi';
import IconButton from '../components/buttons/IconButton';
import ModalProfile from '../components/modal/ModalProfile';

function Navbar({ setIsSidebarOpen }) {
  return (
    <nav className="sticky top-0 flex items-center justify-between w-full md:px-6 md:py-4 bg-white drop-shadow h-[64px] px-3">
      <div className="flex gap-2">
        <IconButton
          onClick={() => setIsSidebarOpen((prevState) => !prevState)}
          icon={HiOutlineMenuAlt2}
          color="gray"
          size="6"
        />
        <IconButton icon={HiOutlineSearch} color="gray" size="6" />
      </div>
      <div className="flex items-center gap-5 md:gap-10">
        <div className="flex gap-2">
          <IconButton icon={HiOutlineBell} color="gray" size="6" />
          <IconButton icon={HiOutlineCog} color="gray" size="6" />
        </div>
        <ModalProfile />
      </div>
    </nav>
  );
}

export default Navbar;
