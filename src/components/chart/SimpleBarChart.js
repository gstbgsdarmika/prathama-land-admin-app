import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Januari',
    pendapatan: 10,
    pesanan: 5,
  },
  {
    name: 'Februari',
    pendapatan: 30,
    pesanan: 15,
  },
  {
    name: 'Maret',
    pendapatan: 20,
    pesanan: 12,
  },
  {
    name: 'April',
    pendapatan: 12,
    pesanan: 8,
  },
  {
    name: 'Mei',
    pendapatan: 15,
    pesanan: 6,
  },
  {
    name: 'Juni',
    pendapatan: 20,
    pesanan: 13,
  },
  {
    name: 'Juli',
    pendapatan: 30,
    pesanan: 14,
  },
];

export default function SimpleBarChart() {
  return (
    <div className="p-5 bg-white rounded-sm drop-shadow-md">
      <div className="flex justify-between mb-3">
        <p className="text-base font-semibold text-gray-700">Laporan keuangan</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={100}
          height={60}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            type="number"
            width={20}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="pendapatan" fill="#22C55E" />
          <Bar dataKey="pesanan" fill="#F97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
