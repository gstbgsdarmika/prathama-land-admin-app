import React, { useState } from 'react';
import {
  HiOutlineSearch,
} from 'react-icons/hi';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import TableOrders from '../../components/table/TableOrders';

function Orders() {
  const methods = useForm();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 md:text-3xl">
            Daftar Pesanan
          </h1>
          <p className="text-xs text-gray-700 md:text-sm">
            Rincian Pesanan yang Tersedia
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FormProvider {...methods}>
            <Input
              id="search"
              className="text-gray-300"
              placeholder="Cari pesanan"
              validation={{ required: 'Search must be filled' }}
              leftIcon={HiOutlineSearch}
              value={searchTerm}
              onChange={handleSearch}
            />
          </FormProvider>
        </div>
      </div>
      <TableOrders searchTerm={searchTerm} />
    </section>
  );
}

export default Orders;
