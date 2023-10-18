import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineFilter } from 'react-icons/hi';
import DatePicker from '../components/forms/Datepicker';
import Button from '../components/buttons/Button';
import Card from '../components/cards/Card';
import SimpleBarChart from '../components/chart/SimpleBarChart';
import SimplePieChart from '../components/chart/SimplePieChart';
import TableDashboard from '../components/table/TableDashboard';

function Dashboard() {
  const methods = useForm();

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Informasi Penjualan
          </h1>
          <p className="text-sm text-gray-800">
            Lihat penjualan & ringkasan saat ini
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FormProvider {...methods}>
            <DatePicker
              id="date"
              validation={{
                required: 'Date must be filled',
                valueAsDate: true,
              }}
              placeholder="dd/mm/yyyy"
            />
          </FormProvider>
          <Button variant="primary" size="base" leftIcon={HiOutlineFilter}>
            Filter
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4 mt-10">
        <Card
          title="Pendapatan"
          value="Rp.20 Juta"
          percentage="11.4"
          isPositive
        />
        <Card title="Pesanan" value="28" percentage="-4" isPositive={false} />
        <Card
          title="Pembelian"
          value="Rp.35 Juta"
          percentage="5.7"
          isPositive
        />
      </div>
      <div className="grid gap-4 mt-10 md:grid-cols-[1fr,_19.5rem]">
        <SimpleBarChart />
        <SimplePieChart />
      </div>

      <div className="mt-10">
        <TableDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
