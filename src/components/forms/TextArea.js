import clsx from 'clsx';
import get from 'lodash.get';
import { useFormContext } from 'react-hook-form';

export default function TextArea({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError = false,
  validation,
  disabled,
  containerClassName,
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;
  return (
    <div className={containerClassName}>
      {withLabel && (
        <p className="block text-sm text-gray-700" htmlFor={id}>
          {label}
        </p>
      )}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        <textarea
          {...register(id, validation)}
          rows={3}
          {...rest}
          name={id}
          id={id}
          readOnly={readOnly}
          disabled={disabled}
          className={clsx(
            'block w-full rounded-lg shadow-sm',
            'border-gray-300 border focus:outline-gray-300 p-4',
            (readOnly || disabled)
              && 'cursor-not-allowed border-gray-300 bg-gray-100 focus:outline-gray-300 focus:ring-0',
            error && 'border-red-500 focus:outline-red-500',
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />
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
