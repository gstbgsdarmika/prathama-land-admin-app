import React from 'react';

function IconButton({
  icon: Icon, onClick, color, size,
}) {
  const buttonClass = `p-1 rounded-full hover:bg-slate-200 ${
    color ? `text-${color}-500` : 'text-gray-500'
  }`;
  const iconClass = `w-${size} h-${size}`;
  return (
    <button type="button" className={buttonClass} onClick={onClick}>
      <Icon className={iconClass} />
    </button>
  );
}

export default IconButton;
