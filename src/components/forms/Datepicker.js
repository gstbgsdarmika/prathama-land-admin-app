import clsx from 'clsx';
import get from 'lodash.get';
import ReactDatePicker from 'react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';

import 'react-datepicker/dist/react-datepicker.css';

export default function Datepicker({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  hideError = false,
  disabled,
  containerClassName,
  ...rest
}) {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);
  return (
    <div className={clsx('relative', containerClassName)}>
      {withLabel && (
        <p className="block text-sm font-medium" htmlFor={id}>
          {label}
        </p>
      )}

      <Controller
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className={clsx('relative', withLabel ? 'mt-0' : 'mt-1')}>
              <ReactDatePicker
                name={id}
                onChange={onChange}
                onBlur={onBlur}
                selected={value ? new Date(value) : undefined}
                className={clsx(
                  'flex w-full rounded-lg shadow-sm',
                  'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
                  'border-gray-300 focus:border-primary-500 focus:outline-green-500 pl-4',
                  (readOnly || disabled)
                    && 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
                  error
                    && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
                placeholderText={placeholder}
                aria-describedby={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                openToDate={value ? new Date(value) : defaultDate}
                dateFormat="dd/MM/yyyy"
                readOnly={readOnly}
                disabled={disabled}
                {...rest}
              />
              <HiOutlineCalendar className="absolute text-lg text-gray-400 transform -translate-y-1/2 pointer-events-none right-4 top-1/2" />
            </div>
            {!(!hideError && error) && helperText && (
              <p className="mt-1 text-xs">
                {helperText}
              </p>
            )}
            {!hideError && error && (
              <p className="mt-1 text-xs">
                {error?.message?.toString()}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
