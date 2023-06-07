import React, { useState, useRef } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import NavigationLink from '../link/NavigationLink';

function Dropdown({ title, icon, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      dropdownRef.current.style.maxHeight = '20rem';
      dropdownRef.current.style.opacity = '1';
    } else {
      dropdownRef.current.style.maxHeight = '0';
      dropdownRef.current.style.opacity = '0';
    }
  };

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-white transition duration-300 ease-in-out rounded-lg group hover:bg-green-700"
        onClick={toggleDropdown}
      >
        {icon && (
          <span className="flex items-center justify-center w-6 h-6 text-white">
            {icon}
          </span>
        )}
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{title}</span>
        <HiOutlineChevronRight
          className={`w-6 h-6 text-white ${
            isOpen ? 'transform rotate-90' : ''
          }`}
        />
      </button>
      <ul
        ref={dropdownRef}
        className="overflow-hidden transition-all transform-gpu"
        style={{
          maxHeight: isOpen ? '20rem' : '0',
          opacity: isOpen ? '1' : '0',
          transitionDuration: '0.3s',
          transformOrigin: 'top',
        }}
      >
        {content.map((item, index) => (
          <NavigationLink
            key={item.id || index}
            to={`/${item.title.toLowerCase().replace(/\s/g, '-')}`}
            title={item.title}
            childrenClassName="ml-9"
          />
        ))}
      </ul>
    </li>
  );
}

export default Dropdown;
