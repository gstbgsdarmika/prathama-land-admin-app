/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
import clsx from 'clsx';
import get from 'lodash.get';
import { Controller, useFormContext } from 'react-hook-form';
import { FiChevronDown, FiX } from 'react-icons/fi';
import Select, { components } from 'react-select';

/**
  @param label: string | null;
  @param id: string;
  @param placeholder (optional) React.ReactNode;
  @param helperText (optional) string;
  @param type (optional) string;
  @param isMulti (optional) boolean;
  @param readOnly (optional) boolean;
  @param hideError (optional) boolean;
  @param validation (optional) RegisterOptions;
  @param options: { value: string; label: string }[];
  @param containerClassName (optional) string;
*/

export default function SearchableSelectInput({
  disabled,
  readOnly,
  label,
  helperText,
  id,
  isMulti = false,
  placeholder,
  validation,
  options,
  hideError = false,
  containerClassName,
  ...rest
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  const withLabel = label !== null;

  // #region  //*=========== Styles ===========
  const customStyles = {
    control: (styles) => ({
      ...styles,
      // red-500 and gray-300
      border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
      '&:hover': {
        border: `1px solid ${error ? '#EF4444' : '#D1D5DB'}`,
      },
      boxShadow: 'none',
      transition: 'none',
      '&:focus-within': {
        border: `1px solid ${error ? '#EF4444' : 'var(--color-primary-500)'}`,
        boxShadow: `0 0 0 1px ${
          error ? '#EF4444' : 'var(--color-primary-500)'
        }`,
      },
      '*': {
        boxShadow: 'none !important',
      },
      borderRadius: '0.5rem',
      padding: '0 0.75rem',
      background: disabled || readOnly ? '#F3F4F6' : undefined,
      cursor: 'pointer',
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
      gap: '0.5rem',
    }),
    input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      caretColor: 'var(--color-primary-500)',
      color: '#1F201d',
      '::placeholder': {
        color: '#5a5d56',
      },
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      '&>div': {
        padding: 0,
      },
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: '#878787',
      '&:hover': {
        color: '#878787',
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: 'black',
      background: state.isSelected ? 'var(--color-primary-100)' : 'white',
      ':hover': {
        background: '#E5E7EB',
      },
      cursor: 'pointer',
    }),
    multiValue: (styles) => ({
      ...styles,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      background: 'var(--color-primary-100)',
      borderRadius: '0.375rem',
      padding: '0.25rem 0.75rem',
      margin: 0,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--color-primary-700)',
      padding: 0,
      paddingLeft: 0,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'var(--color-primary-700)',
      padding: 0,
      paddingLeft: '0.5rem',
      '&:hover': {
        color: 'var(--color-primary-700)',
        backgroundColor: 'transparent',
      },
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: '0.5rem',
      overflow: 'hidden',
    }),
  };

  // #endregion  //*======== Styles ===========
  return (
    <div className={containerClassName}>
      {withLabel && (
      <p className="block text-sm" htmlFor={id}>
        {label}
      </p>
      )}
      <div
        className={clsx(
          'relative',
          withLabel && 'mt-1',
          (disabled || readOnly) && 'cursor-not-allowed',
        )}
      >
        <Controller
          name={id}
          control={control}
          rules={validation}
          render={({ field }) => (
            <Select
              {...field}
              value={
                // ? null is needed so if the selected value is not found in the options, it will clear the value
                isMulti
                  ? field.value?.map(
                    (value) => options.find((option) => option.value === value)
                        ?? null,
                  )
                  : options.find((opt) => opt.value === field.value) ?? null
              }
              onChange={(selectedOptions) => {
                isMulti
                  ? field.onChange(
                    selectedOptions.map((option) => option?.value ?? ''),
                  )
                  : field.onChange(selectedOptions?.value ?? '');
              }}
              isDisabled={disabled}
              isClearable
              isMulti={isMulti}
              closeMenuOnSelect={!isMulti}
              placeholder={placeholder}
              options={options}
              classNames={{
                control: () => '!min-h-[2.25rem] md:!min-h-[2.5rem]',
              }}
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: (props) => (
                  <components.DropdownIndicator {...props}>
                    <FiChevronDown className="text-xl" />
                  </components.DropdownIndicator>
                ),
                ClearIndicator: (props) => (
                  <components.ClearIndicator {...props}>
                    <FiX className="mr-0.5 text-lg text-typo-icons hover:text-typo-secondary" />
                  </components.ClearIndicator>
                ),
                MultiValueRemove: (props) => (
                  <components.MultiValueRemove {...props}>
                    <FiX size={16} />
                  </components.MultiValueRemove>
                ),
              }}
              {...rest}
            />
          )}
        />
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
    </div>
  );
}
