import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const orders = [
  {
    id: 1,
    property: 'Komersial Malang',
    customer: 'Dollie Bullock',
    price: '1,800,000,000',
    payment: 'Credit Card',
    status: 'Menunggu',
    date: '2016/02/23 15:50:23',
  },
  {
    id: 2,
    property: 'Bumi Indah',
    customer: 'Merrill Richardson',
    price: '600.000.000',
    payment: 'Check',
    status: 'Berhasil',
    date: '2016/02/23 15:50:23',
  },
  {
    id: 3,
    property: 'Batu Highlands',
    customer: 'Serena Glover',
    price: '800.000.000',
    payment: 'Credit Card',
    status: 'Error',
    date: '2016/02/23 15:50:23',
  },
  {
    id: 4,
    property: 'Cemara Indah',
    customer: 'Dianne Prince',
    price: '1.00.000.000',
    payment: 'Credit Card',
    status: 'Menunggu',
    date: '2016/02/23 15:50:23',
  },
  {
    id: 5,
    property: 'Sumber Makmur',
    customer: 'Dollie Bullock',
    price: '3.300.000.000',
    payment: 'Check',
    status: 'Berhasil',
    date: '2016/02/23 15:50:23',
  },
  {
    id: 6,
    property: 'Komersial Malang ',
    customer: 'Dollie Bullock',
    price: '1,800,000,000',
    payment: 'Credit Card',
    status: 'Error',
    date: '2016/02/23 15:50:23',
  },
  {
    id: 7,
    property: 'Komersial Malang ',
    customer: 'Dollie Bullock',
    price: '1,800,000,000',
    payment: 'Credit Card',
    status: 'Error',
    date: '2016/02/23 15:50:23',
  },
  {
    id: 8,
    property: 'Komersial Malang ',
    customer: 'Dollie Bullock',
    price: '1,800,000,000',
    payment: 'Credit Card',
    status: 'Error',
    date: '2016/02/23 15:50:23',
  },
];
export default function TableOrders() {
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };
  return (
    <>
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeadOrders />
        <TableBodyOrders currentItems={currentItems} />
      </table>
      <div className="flex items-center justify-between px-4 py-3 border border-b-slate-300">
        <p className="text-sm text-gray-500">Menampilkan {itemOffset + 1} - {itemOffset + currentItems.length} dari {orders.length} Hasil</p>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
}

function TableHeadOrders() {
  return (
    <thead className="text-xs text-gray-900 border bg-gray-50">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input id="checkbox-all-search" type="checkbox" className="h-4 text-blue-600 bg-gray-100 border-gray-100 rounded md:w-4 focus:ring-blue-500 focus:ring-2" />
            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" className="p-2 text-xs md:py-2">
          Id
        </th>
        <th scope="col" className="p-2 text-xs md:py-2">
          Properti
        </th>
        <th scope="col" className="p-2 text-xs md:py-2">
          Pelanggan
        </th>
        <th scope="col" className="p-2 text-xs md:py-2">
          Harga(Rp)
        </th>
        <th scope="col" className="p-2 text-xs md:py-2">
          Pembayaran
        </th>
        <th scope="col" className="p-2 text-xs md:py-2">
          Status
        </th>
        <th scope="col" className="p-2 text-xs md:py-2">
          Tanggal
        </th>
      </tr>
    </thead>
  );
}

function TableBodyOrders(props) {
  const { currentItems } = props;
  return (
    <tbody>
      {currentItems && currentItems.map((order) => (
        <tr className="bg-white border-b hover:bg-gray-50">
          <td className="p-4 md:w-2">
            <div className="flex items-center">
              <input id="checkbox-table-search-1" type="checkbox" className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded md:w-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
            </div>
          </td>
          <td className="px-2 text-xs md:py-2 md:text-sm">
            {order.id}
          </td>
          <td className="px-2 overflow-hidden text-xs md:py-2 md:text-sm text-ellipsis">
            {order.property}
          </td>
          <td className="px-2 text-xs md:py-2 md:text-sm">
            {order.customer}
          </td>
          <td className="px-2 text-xs md:py-2 md:text-sm">
            {order.price}
          </td>
          <td className="px-2 text-xs md:py-2 md:text-sm">
            {order.payment}
          </td>
          <td className="px-2 text-xs text-center md:py-2 md:text-sm">
            <div className={`px-1 py-1 text-white rounded-lg ${getStatusColor(order.status)}`}>
              {order.status}
            </div>
          </td>
          <td className="px-2 text-xs md:py-2 md:text-sm">
            {order.date}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'Berhasil':
      return 'bg-green-600';
    case 'Error':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
}
