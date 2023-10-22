import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Hourglass } from 'react-loader-spinner';
import { orders } from '../../utils/data';

export default function TableOrders({ searchTerm }) {
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi proses loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Mengubah menjadi false setelah 2 detik (ganti sesuai kebutuhan)
  }, []);

  const filteredOrders = searchTerm
    ? orders.filter((order) => order.property.toLowerCase().includes(searchTerm.toLowerCase()))
    : orders;

  const currentItems = filteredOrders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);

  function handleSelectAll() {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentItems.map((order) => order.id));
    }
    setSelectAll(!selectAll);
  }

  function handleSelectOrder(id) {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      }
      return [...prevSelected, id];
    });
    setSelectAll(selectedOrders.length + 1 === currentItems.length);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full mt-32">
        <Hourglass color="#36D7B7" height={80} width={80} />
      </div>
    );
  }

  if (currentItems.length === 0) {
    return (
      <div className="justify-center mt-32 text-xl text-center">Tidak ada hasil yang ditemukan.</div>
    );
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
    setSelectedOrders([]);
    setSelectAll(false);
  };

  return (
    <div className="mt-5 shadow-md md:overflow-x-auto md:mt-10 md:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 shadow-md">
        <thead className="text-xs text-gray-900 border bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="h-4 text-blue-600 bg-gray-100 border-gray-100 rounded md:w-4 focus:ring-blue-500 focus:ring-2"
                />
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
        <tbody>
          {currentItems && currentItems.map((order) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={order.id}>
              <td className="p-4 md:w-2">
                <div className="flex items-center">
                  <input id={`checkbox-table-search-${order.id}`} type="checkbox" className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded md:w-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={selectedOrders.includes(order.id)} onChange={() => handleSelectOrder(order.id)} />
                  <label htmlFor={`checkbox-table-search-${order.id}`} className="sr-only">checkbox</label>
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
      </table>
      <div className="flex items-center justify-between px-4 py-2 bg-white border border-b-slate-300">
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
    </div>
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
