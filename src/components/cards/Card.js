import React from 'react';
import {
  HiOutlineArrowNarrowUp,
  HiOutlineArrowNarrowDown,
} from 'react-icons/hi';

function Card({
  title, value, percentage, isPositive,
}) {
  return (
    <div className="flex flex-col p-5 bg-white rounded-sm drop-shadow-md">
      <h1 className="text-base font-semibold text-gray-700">{title}</h1>
      <div className="flex items-center justify-between gap-4">
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        <div
          className={`flex items-center px-2 py-1 rounded-lg ${
            isPositive ? 'bg-green-200' : 'bg-red-200'
          }`}
        >
          {isPositive ? (
            <HiOutlineArrowNarrowUp className="font-medium text-green-500" />
          ) : (
            <HiOutlineArrowNarrowDown className="font-medium text-red-500" />
          )}
          <p
            className={`text-xs font-medium ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {percentage}%
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-500">
        vs. 3 bulan sebelum <span className="font-semibold">22 Jan</span>
      </p>
    </div>
  );
}

export default Card;
