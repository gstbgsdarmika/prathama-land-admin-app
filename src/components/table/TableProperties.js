import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiPencilAlt, HiTrash, HiEye, HiChevronLeft, HiChevronRight,
} from 'react-icons/hi';
import Swal from 'sweetalert2';
import { ref, onValue, remove } from 'firebase/database';
import { ThreeCircles } from 'react-loader-spinner';
import { database } from '../../utils/firebase';
import Button from '../buttons/Button';

export default function TableProperties({ searchKeyword }) {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filteredProperties = properties.filter((property) => {
    const name = property.name.toLowerCase();
    return name.includes(searchKeyword.toLowerCase());
  });

  const totalProperties = filteredProperties.length;

  useEffect(() => {
    const propertiesRef = ref(database, 'daftar-properti');
    setIsLoading(true);

    setTimeout(() => {
      onValue(propertiesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const propertiesList = Object.values(data);
          const test = Object.keys(data);
          const combinedProperties = propertiesList.map((property, index) => ({
            ...property,
            id: test[index],
          }));
          setProperties(combinedProperties);
        }
        setIsLoading(false);
      });
    }, 500);
  }, []);

  const handleCheckboxChange = (propertyId) => {
    setSelectedProperties((prevSelected) => {
      if (prevSelected.includes(propertyId)) {
        return prevSelected.filter((id) => id !== propertyId);
      }
      return [...prevSelected, propertyId];
    });
  };

  const handleAllCheckboxChange = () => {
    setIsAllChecked(!isAllChecked);
    setSelectedProperties(isAllChecked ? [] : currentProperties.map((property) => property.id));
  };

  const isChecked = (propertyId) => selectedProperties.includes(propertyId);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (propertyId, name) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda tidak akan bisa mengembalikan properti "${name}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const propertyRef = ref(database, `daftar-properti/${propertyId}`);
        remove(propertyRef)
          .then(() => {
            Swal.fire('Terhapus!', `Properti "${name}" telah dihapus.`, 'success');
          })
          .catch((error) => {
            console.error('Error removing property: ', error);
            Swal.fire('Error', 'Terjadi kesalahan saat menghapus properti.', 'error');
          });
      }
    });
  };

  return (
    <div>
      {isLoading && (
      <div className="flex items-center justify-center w-full h-full mt-36">
        <ThreeCircles
          visible
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          color="#4fa94d"
        />
      </div>
      )}

      {!isLoading && filteredProperties.length === 0 && (
      <div className="justify-center mt-32 text-xl text-center">
        <p>Properti tidak tersedia.</p>
      </div>
      )}

      {!isLoading && filteredProperties.length > 0 && (
        <div className="mt-5 md:overflow-x-auto md:shadow-md md:mt-10 md:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 transition-all duration-400">
            <thead className="text-xs text-gray-900 border bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="h-4 text-blue-600 bg-gray-100 border-gray-100 rounded md:w-4 focus:ring-blue-500 focus:ring-2"
                      checked={isAllChecked}
                      onChange={handleAllCheckboxChange}
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
            <tbody>
              {currentProperties.map((data) => (
                <tr key={data.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4 md:w-2">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${data.id}`}
                        type="checkbox"
                        className="h-4 text-blue-600 bg-gray-100 border-gray-300 rounded md:w-4 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={isChecked(data.id)}
                        onChange={() => handleCheckboxChange(data.id)}
                      />
                      <label
                        htmlFor={`checkbox-table-search-${data.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="flex justify-center p-2 opacity-0 pointer-events-none md:opacity-100">
                    <img
                      src={data.image}
                      alt={`gambar ${data.name}`}
                      className="rounded-sm opacity-0 pointer-events-none md:opacity-100 w-14"
                    />
                  </td>
                  <td className="w-1/6 px-2 overflow-hidden text-xs md:py-2 md:text-sm text-ellipsis">
                    {data.name}
                  </td>
                  <td className="w-1/6 px-2 text-xs md:py-2 md:text-sm">
                    {data.price}
                  </td>
                  <td className="w-1/6 px-2 text-xs md:py-2 md:text-sm">
                    {data.type}
                  </td>
                  <td className="w-1/6 px-2 text-xs md:py-2 md:text-sm">
                    {data.area}
                  </td>
                  <td className="px-2 md:py-2">
                    <div className="flex gap-2">
                      <Link to={`/daftar-properti/${data.id}`}>
                        <Button variant="warning" size="sm" centerIcon={HiEye} />
                      </Link>
                      <Link to={`/edit-properti/${data.id}`}>
                        <Button variant="blue" size="sm" centerIcon={HiPencilAlt} />
                      </Link>
                      <Button
                        onClick={() => handleDelete(data.id, data.name)}
                        variant="danger"
                        size="sm"
                        centerIcon={HiTrash}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-4 py-2 border border-b-slate-300">
            <div className="text-sm text-gray-500">
              Menampilkan{' '}
              {totalProperties === 0 ? '0' : `${indexOfFirstProperty + 1} - ${Math.min(indexOfLastProperty, totalProperties)}`}{' '}
              dari {totalProperties} properti
            </div>
            <div className="flex">
              <Button
                className="shadow-none shadow-transparent"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                variant="ghost"
                size="sm"
                centerIcon={HiChevronLeft}
              />
              <ul className="flex">
                {Array.from({ length: Math.ceil(totalProperties / propertiesPerPage) }).map((_, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => paginate(index + 1)}
                      className={` rounded-md h-8 w-8 text-center justify-center ${currentPage === index + 1 ? 'bg-green-600 text-white' : 'bg-transparent text-gray-800'}`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                className="shadow-none shadow-transparent"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastProperty >= totalProperties || currentProperties.length === 0}
                variant="ghost"
                size="sm"
                centerIcon={HiChevronRight}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
