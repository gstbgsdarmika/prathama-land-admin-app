import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { HiOutlineUserCircle, HiOutlineMailOpen, HiOutlineLogout } from 'react-icons/hi';
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
  {
    name: 'Keluar',
    href: '/login',
    icon: IconThree,
  },
];

export default function ModalProfile() {
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
              <Popover.Panel className="absolute left-1/2 z-10 mt-1 -translate-x-1/2 transform lg:max-w-3xl min-w-full">
                <div className="overflow-hidden rounded-lg border shadow-sm">
                  <div className=" grid gap-2 bg-white p-1">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-x-4 rounded-sm transition duration-150 ease-in-out px-5 py-1 hover:bg-gray-100 focus:outline-none"
                      >
                        <div className="flex text-2xl shrink-0 items-center justify-center text-gray-500">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                        </div>
                      </a>
                    ))}
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
