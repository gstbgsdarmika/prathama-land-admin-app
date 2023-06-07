import React from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { useFormContext } from 'react-hook-form';

function Input({
  name, type, placeholder, label,
}) {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="w-full inline-flex border rounded-md">
        <div className="p-2 bg-gray-100">
          {type === 'text' && <UserIcon className="h-6 w-6 text-gray-800" />}
          {type === 'password' && (
            <LockClosedIcon className="h-6 w-6 text-gray-800" />
          )}
        </div>
        <input
          id={name}
          type={type}
          className="focus:outline-none focus:text-gray-600 p-2"
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
    </div>
  );
}

export default Input;
