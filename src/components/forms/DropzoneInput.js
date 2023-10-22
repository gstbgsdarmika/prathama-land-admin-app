/* eslint-disable no-unused-expressions */
import clsx from 'clsx';
import get from 'lodash.get';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';

import FilePreview from './FilePreview';

/**
  @param accept (optional) Accept;
  @param helperText (optional) string;
  @param id: string;
  @param label: string;
  @param maxFiles (optional) number;
  @param readOnly (optional) boolean;
  @param hideError (optional) boolean;
  @param validation (optional) Record<string, unknown>;
 */
export default function DropzoneInput({
  accept,
  helperText = '',
  id,
  label,
  maxFiles = 1,
  validation,
  readOnly,
  hideError = false,
}) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  // #region  //*=========== Error Focus ===========
  const dropzoneRef = React.useRef(null);

  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);
  // #endregion  //*======== Error Focus ===========

  const [files, setFiles] = React.useState(getValues(id) || []);

  const onDrop = React.useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null);
        setError(id, {
          type: 'manual',
          message: rejectedFiles && rejectedFiles[0].errors[0].message,
        });
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
        }));

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview,
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          {
            shouldValidate: true,
          },
        );
        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue],
  );

  React.useEffect(() => () => {
    () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const deleteFile = (e, file) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setFiles(newFiles);
      setValue(id, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 5000000,
  });

  return (
    <div>
      <p className="block text-sm text-gray-700" htmlFor={id}>
        {label}
      </p>

      {readOnly && !(files?.length > 0) ? (
        <div className="py-3 pl-3 pr-4 mt-1 text-sm border border-gray-300 divide-y divide-gray-300 rounded-sm">
          No file uploaded
        </div>
      ) : files?.length >= maxFiles ? (
        <ul className="mt-1 border border-gray-300 divide-y divide-gray-300 rounded-lg">
          {files.map((file, index) => (
            <FilePreview
              key={index.id}
              readOnly={readOnly}
              file={file}
              deleteFile={deleteFile}
            />
          ))}
        </ul>
      ) : (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={({ field }) => (
            <>
              <div
                className="mt-1 border border-gray-300 rounded-md focus:ring-dark-400 group focus:outline-none focus:border-gray-300 focus:ring-gray-300"
                {...getRootProps()}
                ref={dropzoneRef}
              >
                <input {...field} {...getInputProps()} />
                <div
                  className={clsx(
                    'w-full cursor-pointer rounded-lg px-2 py-8',
                    error
                      ? 'dropzone-border-dash-error border-red-500 group-focus:border-red-500'
                      : 'dropzone-border-dash group-focus:border-primary-500',
                  )}
                >
                  <div className="space-y-1 text-center">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="block text-xs text-gray-700">
                      Seret dan lepas file di sini, atau klik untuk memilih file
                    </p>
                    <p className="text-xs text-gray-500">{`${
                      maxFiles - (files?.length || 0)
                    } file tersisa`}
                    </p>
                  </div>
                </div>
              </div>

              {!(!hideError && error) && helperText && (
                <p color="secondary" className="mt-1 text-xs text-gray-500">
                  {helperText}
                </p>
              )}
              {!hideError && error && (
                <p color="danger" className="mt-1 text-xs text-red-500">
                  {error?.message?.toString()}
                </p>
              )}
              {!readOnly && !!files?.length && (
                <ul className="mt-1 border border-gray-300 divide-y divide-gray-300 rounded-lg">
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      readOnly={readOnly}
                      file={file}
                      deleteFile={deleteFile}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        />
      )}
    </div>
  );
}
