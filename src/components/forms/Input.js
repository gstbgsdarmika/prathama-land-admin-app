import clsx from 'clsx';
import get from 'lodash.get';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Input({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  disabled,
  readOnly = false,
  hideError = false,
  validation,
  leftIcon: LeftIcon,
  rightNode,
  containerClassName,
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = !!label;
  return (
    <div className={containerClassName}>
      {withLabel && (
        <p className="block text-sm text-gray-700" htmlFor={id}>
          {label}
        </p>
      )}
      <div
        className={clsx('relative', withLabel && 'mt-1', LeftIcon && 'group')}
      >
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {typeof LeftIcon === 'string' ? (
              <p className="text-xs font-medium">{LeftIcon}</p>
            ) : (
              <LeftIcon
                size="1em"
                className="text-xl text-gray-400 text-typo-secondary group-focus-within:text-typo"
              />
            )}
          </div>
        )}
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsx(
            'flex w-full rounded-lg shadow-sm',
            'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
            'border-gray-300 border focus:outline-gray-300',
            (readOnly || disabled)
              && 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            LeftIcon ? 'pl-9' : 'pl-4',
            rightNode && 'pr-10',
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        {rightNode && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightNode}
          </div>
        )}
      </div>
      {!(!hideError && error) && helperText && (
        <p color="secondary" className="mt-1 text-xs">
          {helperText}
        </p>
      )}
      {!hideError && error && (
        <p color="danger" className="mt-1 text-xs">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  );
}
