import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { HiOutlineUserCircle, HiOutlineMailOpen, HiOutlineLogout } from 'react-icons/hi';
import { signOutUser } from '../../auth/auth';
import user from '../../assets/img/user.png';

const solutions = [
  {
    name: 'Profile',
    href: '/profile',
    icon: IconOne,
  },
  {
    name: 'Pesan',
    href: '/inbox',
    icon: IconTwo,
  },
];

export default function ModalProfile() {
  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out', error);
    }
  };
  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md text-base font-medium outline-none`}
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <p className="text-sm font-semibold text-gray-900">Bgs Darmika</p>
                  <p className="text-xs text-gray-700">Admin</p>
                </div>
                <div className="rounded-full">
                  <img
                    src={user}
                    alt="gambar user"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 min-w-full mt-1 transform -translate-x-1/2 left-1/2 lg:max-w-3xl">
                <div className="overflow-hidden border rounded-lg shadow-sm">
                  <div className="grid gap-2 p-1 bg-white ">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-5 py-1 transition duration-150 ease-in-out rounded-sm gap-x-4 hover:bg-gray-100 focus:outline-none"
                      >
                        <div className="flex items-center justify-center text-2xl text-gray-500 shrink-0">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                        </div>
                      </a>
                    ))}
                    <a
                      key="Keluar"
                      href="/login"
                      onClick={handleSignOut}
                      className="flex items-center px-5 py-1 transition duration-150 ease-in-out rounded-sm gap-x-4 hover:bg-gray-100 focus:outline-none"
                    >
                      <div className="flex items-center justify-center text-2xl text-gray-500 shrink-0">
                        <IconThree aria-hidden="true" />
                      </div>
                      <div className="">
                        <p className="text-sm font-medium text-gray-900">
                          Keluar
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function IconOne() {
  return (
    <HiOutlineUserCircle />
  );
}

function IconTwo() {
  return (
    <HiOutlineMailOpen />
  );
}

function IconThree() {
  return (
    <HiOutlineLogout />
  );
}
