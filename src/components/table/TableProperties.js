import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
  HiPencilAlt, HiTrash, HiEye,
} from 'react-icons/hi';
import Button from '../buttons/Button';
import img1 from '../../assets/img/property/image 1.jpg';
import img2 from '../../assets/img/property/image 2.jpg';
import img3 from '../../assets/img/property/image 3.jpg';
import img4 from '../../assets/img/property/image 4.jpg';

const properties = [
  {
    id: 1,
    image: img1,
    name: 'Komersial Malang',
    price: '1.800.000.000',
    type: 'Investasi',
    area: '800 m²',
  },
  {
    id: 2,
    image: img2,
    name: 'Bumi Indah',
    price: '600.000.000',
    type: 'Pertanian',
    area: '300 m²',
  },
  {
    id: 3,
    image: img3,
    name: 'Batu Highlands',
    price: '800.000.000',
    type: 'Kosong',
    area: '500 m²',
  },
  {
    id: 4,
    image: img4,
    name: 'Komersial Malang ',
    price: '3.300.000.000',
    type: 'Kosong',
    area: '1.800 m²',
  },
  {
    id: 5,
    image: img2,
    name: 'Cemara Indah',
    price: '4.800.000.000',
    type: 'Pertanian',
    area: '800 m²',
  },
  {
    id: 6,
    image: img1,
    name: 'Batu Highlands',
    price: '5.000.000.000',
    type: 'Investasi',
    area: '1.000 m²',
  },
  {
    id: 7,
    image: img2,
    name: 'Sumber Makmur',
    price: '3.400.000.000',
    type: 'Pertanian',
    area: '500 m²',
  },
];

export default function TableProperties() {
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = properties.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(properties.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % properties.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeadProperties />
        <TableBodyProperties currentItems={currentItems} />
      </table>
      <div className="flex items-center justify-between px-4 py-3 border border-b-slate-300">
        <p className="text-sm text-gray-500">Menampilkan {itemOffset + 1} - {itemOffset + currentItems.length} dari {properties.length} Hasil</p>
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

function TableHeadProperties() {
  return (
    <thead className="text-xs text-gray-900 border bg-gray-50">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input id="checkbox-all-search" type="checkbox" className="h-4 text-blue-600 bg-gray-100 border-gray-100 rounded md:w-4 focus:ring-blue-500 focus:ring-2" />
            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" className="p-2 md:py-2"><span className="sr-only">Image</span></th>
        <th scope="col" className="w-1/6 p-2 text-xs md:py-2">
          Nama
        </th>
        <th scope="col" className="w-1/6 p-2 text-xs md:py-2">
          Harga(Rp)
        </th>
        <th scope="col" className="w-1/6 p-2 text-xs md:py-2">
          Tipe
        </th>
        <th scope="col" className="w-1/6 p-2 text-xs md:py-2">
          Luas
        </th>
        <th scope="col" className="w-1/6 p-2 text-xs md:py-2">
          Action
        </th>
      </tr>
    </thead>
  );
}

function TableBodyProperties(props) {
  const { currentItems } = props;
  return (
    <tbody>
      {currentItems && currentItems.map((property) => (
        <tr
          key={property.id}
          className="bg-white border-b hover:bg-gray-50"
        >
          <td className="p-4 md:w-2">
            <div className="flex items-center">
              <input
                id={`checkbox-table-search-${property.id}`}
                type="checkbox"
                className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded md:w-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={`checkbox-table-search-${property.id}`}
                className="sr-only"
              >
                checkbox
              </label>
            </div>
          </td>
          <td className="flex justify-center p-2 opacity-0 pointer-events-none md:opacity-100">
            <img
              src={property.image}
              alt={`gambar ${property.id}`}
              className="rounded-sm opacity-0 pointer-events-none md:opacity-100 w-14"
            />
          </td>
          <td className="w-1/6 px-2 overflow-hidden text-xs md:py-2 md:text-sm text-ellipsis">
            {property.name}
          </td>
          <td className="w-1/6 px-2 text-xs md:py-2 md:text-sm">
            {property.price}
          </td>
          <td className="w-1/6 px-2 text-xs md:py-2 md:text-sm">
            {property.type}
          </td>
          <td className="w-1/6 px-2 text-xs md:py-2 md:text-sm">
            {property.area}
          </td>
          <td className="px-2 md:py-2">
            <div className="flex gap-2">
              <Button variant="warning" size="sm" centerIcon={HiEye} />
              <Button variant="blue" size="sm" centerIcon={HiPencilAlt} />
              <Button variant="danger" size="sm" centerIcon={HiTrash} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
