import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { properties } from '../../utils/data';

export default function TableDashboard() {
  const itemsPerPage = 4;
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
    <div className="bg-white rounded-sm drop-shadow-md">
      <div className="flex items-center justify-between p-4 border border-b-slate-300">
        <p className="text-base font-semibold text-gray-700">Kumpulan Properti Terkini</p>
      </div>
      {currentItems.length > 0 ? (
        currentItems.map((properti) => (
          <TableHeadDashboard
            key={properti.id}
            image={properti.image}
            name={properti.name}
            price={properti.price}
            area={properti.area}
            type={properti.type}
            landCertificate={properti.landCertificate}
          />
        ))
      ) : (
        <div className="p-4 text-center">
          Data tidak tersedia.
        </div>
      )}
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
    </div>
  );
}

function TableHeadDashboard({
  image, name, price, area, type, landCertificate,
}) {
  return (
    <div className="grid md:grid-cols-[5rem,_12rem,_1fr,_1fr,_1fr,_1fr] gap-5 py-2 px-4 items-center border-b">
      <div>
        <img src={image} alt="gambar 1" className="rounded-sm opacity-0 pointer-events-none md:opacity-100 w-14" />
      </div>
      <div className="text-sm ">
        <p>{name}</p>
        <p>Lokasi</p>
      </div>
      <div className="text-sm">
        <p>{price}</p>
        <p>Harga</p>
      </div>
      <div className="text-sm">
        <p>{area}</p>
        <p>Luas</p>
      </div>
      <div className="text-sm">
        <p>{type}</p>
        <p>Tipe</p>
      </div>
      <div className="text-sm">
        <p>{landCertificate}</p>
        <p>Sertifikat</p>
      </div>
    </div>
  );
}
