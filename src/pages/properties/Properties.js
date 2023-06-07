import * as React from 'react';
import { HiPlusSm, HiOutlineSearch } from 'react-icons/hi';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';

function Properties() {
  const methods = useForm();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="deskripsi">
          <h1 className="text-3xl font-semibold text-gray-900">
            Daftar Properties
          </h1>
          <p className="text-sm text-gray-600">
            Koleksi Properti yang Tersedia
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <FormProvider {...methods}>
            <Input
              id="search"
              className="text-gray-300"
              placeholder="Cari properti..."
              validation={{ required: 'Search must be filled' }}
              leftIcon={HiOutlineSearch}
            />
          </FormProvider>
          <Button variant="primary" size="sm" leftIcon={HiPlusSm}>
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Properties;
