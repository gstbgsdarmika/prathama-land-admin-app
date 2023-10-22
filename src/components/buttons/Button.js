import * as React from 'react';
import { HiOutlinePlusSmall } from 'react-icons/hi2';

import clsx from 'clsx';

/**
 * @param isLoading (optional) boolean
 * @param variant (optional)
  'primary',
  'secondary',
  'danger',
  'outline',
  'ghost',
  'warning'
 * @param size (optional) 'sm', 'base', 'lg'
 * @param leftIcon (optional) IconType
 * @param rightIcon (optional) IconType
 * @param leftIconClassName (optional) string
 * @param rightIconClassName (optional) string
 */

const Button = React.forwardRef(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      centerIcon: CenterIcon,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      centerIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'focus:outline-none focus-visible:ring',
          'shadow-sm',
          'transition-colors duration-75',
          // #region  //*=========== Size ===========
          [
            size === 'lg' && [
              'min-h-[2.75rem] px-3.5 md:min-h-[3rem]',
              'text-base',
            ],
            size === 'base' && [
              'min-h-[2.25rem] px-3 md:min-h-[2.5rem]',
              'text-sm md:text-base',
            ],
            size === 'sm' && [
              'min-h-[1.75rem] px-2 md:min-h-[2rem]',
              'text-xs md:text-sm',
            ],
          ],
          // #endregion  //*======== Size ===========
          // #region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-green-600 text-white',
              'hover:bg-green-700 hover:text-white',
              'active:bg-green-800',
              'disabled:border-green-400 disabled:bg-gray-400',
              'focus-visible:ring-green-400',
            ],
            variant === 'secondary' && [
              'bg-white text-green-600',
              'border border-green-500',
              'hover:bg-green-600 hover:text-white',
              'active:bg-gray-200',
              'disabled:border-green-500 disabled:bg-gray-400 disabled:text-white',
              'focus-visible:ring-green-400',
            ],
            variant === 'blue' && [
              'bg-blue-600 text-white',
              'hover:bg-blue-700 hover:text-white',
              'active:bg-blue-800',
              'disabled:border-blue-400 disabled:bg-gray-400',
              'focus-visible:ring-blue-400',
            ],
            variant === 'danger' && [
              'bg-red-500 text-white',
              'border border-red-600',
              'hover:bg-red-600 hover:text-white',
              'active:bg-red-700',
              'disabled:bg-red-700',
              'focus-visible:ring-red-400',
            ],
            variant === 'warning' && [
              'bg-amber-500 text-white',
              'border border-amber-500',
              'hover:bg-amber-600 hover:text-white',
              'active:bg-amber-700',
              'disabled:bg-amber-700',
              'focus-visible:ring-amber-400',
            ],
            variant === 'outline' && [
              'text-typo',
              'border border-gray-300',
              'hover:bg-light focus-visible:ring-primary-400 active:bg-typo-divider disabled:bg-typo-divider',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              // 'hover:bg-primary-50 focus-visible:ring-primary-400 active:bg-primary-100 disabled:bg-primary-100',
            ],
          ],
          // #endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading
            && 'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsx(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': [
                  'primary',
                  'secondary',
                  'danger',
                  'warning',
                ].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              },
            )}
          >
            <HiOutlinePlusSmall className="animate-spin" />
          </div>
        )}
        {LeftIcon && (
          <div
            className={clsx([
              size === 'lg' && 'mr-3',
              size === 'base' && 'mr-2',
              size === 'sm' && 'mr-1',
            ])}
          >
            <LeftIcon
              size="1em"
              className={clsx('text-base', leftIconClassName)}
            />
          </div>
        )}
        {CenterIcon && (
          <div
            className={clsx([
              size === 'lg' && 'm-auto',
              size === 'base' && 'm-auto',
              size === 'sm' && 'm-auto',
            ])}
          >
            <CenterIcon
              size="1.25rem"
              className={clsx('text-base', centerIconClassName)}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={clsx([
              size === 'lg' && 'ml-3',
              size === 'base' && 'ml-2',
              size === 'sm' && 'ml-1',
            ])}
          >
            <RightIcon
              size="1em"
              className={clsx('text-base', rightIconClassName)}
            />
          </div>
        )}
      </button>
    );
  },
);

export default Button;
