import * as React from 'react';
import { Link } from 'react-router-dom';
import { HiPlusSm, HiOutlineSearch } from 'react-icons/hi';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';
import TableProperties from '../../components/table/TableProperties';

function Properties() {
  const methods = useForm();

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-3xl">
            Daftar Properti
          </h1>
          <p className="text-xs text-gray-700 md:text-sm">
            Koleksi Properti yang Tersedia
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FormProvider {...methods}>
            <Input
              id="search"
              className="text-gray-300"
              placeholder="Cari properti..."
              validation={{ required: 'Search must be filled' }}
              leftIcon={HiOutlineSearch}
            />
          </FormProvider>
          <Link to="/tambah-properti">
            <Button variant="primary" size="base" leftIcon={HiPlusSm}>
              Tambah
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-5 md:overflow-x-auto md:shadow-md md:mt-10 md:rounded-lg">
        <TableProperties />
      </div>
    </section>
  );
}

export default Properties;
