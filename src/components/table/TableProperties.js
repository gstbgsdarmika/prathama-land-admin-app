import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { HiPencilAlt, HiTrash, HiEye } from 'react-icons/hi';
import Swal from 'sweetalert2';
import Button from '../buttons/Button';
import { properties } from '../../utils/data';

export default function TableProperties({ searchKeyword }) {
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);
  const pageCount = Math.ceil(properties.length / itemsPerPage);

  const filteredProperties = useMemo(() => properties.filter((property) => property.name.toLowerCase().includes(searchKeyword.toLowerCase())), [searchKeyword]);
  useEffect(() => {
    const filteredItems = filteredProperties.slice(itemOffset, endOffset);
    setCurrentItems(filteredItems);
  }, [filteredProperties, itemOffset]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % properties.length;
    setItemOffset(newOffset);
  };

  const handleCheckboxChange = (event) => {
    const checkboxId = event.target.id;
    const isChecked = event.target.checked;

    if (checkboxId === 'checkbox-all-search') {
      setSelectAll(isChecked);
      setSelectedItems(isChecked ? currentItems.map((item) => item.id) : []);
    } else {
      const itemId = parseInt(checkboxId.replace('checkbox-table-search-', ''), 10);
      if (isChecked) {
        setSelectedItems([...selectedItems, itemId]);
      } else {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
      }
      setSelectAll(selectedItems.length + 1 === currentItems.length);
    }
  };

  const handleDeleteClick = (propertyName) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda tidak akan bisa mengembalikan properti "${propertyName}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Terhapus!', `Properti "${propertyName}" telah dihapus.`, 'success');
      }
    });
  };

  return (
    <div>
      {filteredProperties.length === 0 ? (
        <p className="justify-center mt-32 text-xl text-center">Properti tidak tersedia.</p>
      ) : (
        <div className="mt-5 md:overflow-x-auto md:shadow-md md:mt-10 md:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <TableHeadProperties
              selectAll={selectAll}
              handleCheckboxChange={handleCheckboxChange}
            />
            {filteredProperties.length === 0 ? (
              <p className="py-4 text-center">Tidak ada properti tersedia.</p>
            ) : (
              <TableBodyProperties
                currentItems={currentItems}
                filteredProperties={filteredProperties}
                handleDeleteClick={handleDeleteClick}
                selectedItems={selectedItems}
                handleCheckboxChange={handleCheckboxChange}
              />
            )}
          </table>
          <div className="flex items-center justify-between px-4 py-3 border border-b-slate-300">
            <p className="text-sm text-gray-500">
              Menampilkan {itemOffset + 1} - {itemOffset + currentItems.length} dari {properties.length} Hasil
            </p>
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
      )}
    </div>
  );
}

function TableHeadProperties({ selectAll, handleCheckboxChange }) {
  return (
    <thead className="text-xs text-gray-900 border bg-gray-50">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="h-4 text-blue-600 bg-gray-100 border-gray-100 rounded md:w-4 focus:ring-blue-500 focus:ring-2"
              checked={selectAll}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
          </div>
        </th>
        <th scope="col" className="p-2 md:py-2">
          <span className="sr-only">Image</span>
        </th>
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

function TableBodyProperties({
  currentItems,
  selectedItems,
  handleDeleteClick,
  handleCheckboxChange,
}) {
  return (
    <tbody>
      { currentItems.map((property) => (
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
                checked={selectedItems.includes(property.id)}
                onChange={handleCheckboxChange}
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
              <Link to={`/properti/${property.id}`}>
                <Button variant="warning" size="sm" centerIcon={HiEye} />
              </Link>
              <Link to={`/edit-properti/${property.id}`}>
                <Button variant="blue" size="sm" centerIcon={HiPencilAlt} />
              </Link>
              <Button
                onClick={() => handleDeleteClick(property.name)}
                variant="danger"
                size="sm"
                centerIcon={HiTrash}
              />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
