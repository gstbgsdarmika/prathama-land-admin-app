import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import img1 from '../../assets/img/property/image 1.jpg';
import img2 from '../../assets/img/property/image 2.jpg';
import img3 from '../../assets/img/property/image 3.jpg';
import img4 from '../../assets/img/property/image 4.jpg';

const propertyData = [
  {
    id: 1,
    img: img1,
    nama: 'Residensial Bumi Indah',
    tanggal: '24 Apr 2023',
    harga: 'Rp 1.000.000.000',
    luas: '100 m²',
    tipe: 'Rumah',
    sertifikat: 'SHM',
  },
  {
    id: 2,
    img: img2,
    nama: 'Komersial Malang Raya',
    tanggal: '19 Mar 2023',
    harga: 'Rp 2.500.000.000',
    luas: '150 m²',
    tipe: 'Apartemen',
    sertifikat: 'SHGB',
  },
  {
    id: 3,
    img: img3,
    nama: 'Investasi Batu Highlands',
    tanggal: '01 Mar 2023',
    harga: 'Rp 800.000.000',
    luas: '80 m²',
    tipe: 'Rumah',
    sertifikat: 'SHM',
  },
  {
    id: 4,
    img: img4,
    nama: 'Investasi Batu Highlands',
    tanggal: '01 Mar 2023',
    harga: 'Rp 800.000.000',
    luas: '80 m²',
    tipe: 'Rumah',
    sertifikat: 'SHM',
  },
  {
    id: 5,
    img: img1,
    nama: 'Residensial Bumi Indah',
    tanggal: '24 Apr 2023',
    harga: 'Rp 1.000.000.000',
    luas: '100 m²',
    tipe: 'Rumah',
    sertifikat: 'SHM',
  },
  {
    id: 6,
    img: img3,
    nama: 'Komersial Malang Raya',
    tanggal: '19 Mar 2023',
    harga: 'Rp 2.500.000.000',
    luas: '150 m²',
    tipe: 'Apartemen',
    sertifikat: 'SHGB',
  },
  {
    id: 7,
    img: img2,
    nama: 'Investasi Batu Highlands',
    tanggal: '01 Mar 2023',
    harga: 'Rp 800.000.000',
    luas: '80 m²',
    tipe: 'Rumah',
    sertifikat: 'SHM',
  },
  {
    id: 8,
    img: img4,
    nama: 'Investasi Batu Highlands',
    tanggal: '01 Mar 2023',
    harga: 'Rp 800.000.000',
    luas: '80 m²',
    tipe: 'Rumah',
    sertifikat: 'SHM',
  },
];

export default function TableDashboard() {
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = propertyData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(propertyData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % propertyData.length;
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
            img={properti.img}
            nama={properti.nama}
            tanggal={properti.tanggal}
            harga={properti.harga}
            luas={properti.luas}
            tipe={properti.tipe}
            sertifikat={properti.sertifikat}
          />
        ))
      ) : (
        <div className="p-4 text-center">
          Data tidak tersedia.
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3 border border-b-slate-300">
        <p className="text-sm text-gray-500">Menampilkan {itemOffset + 1} - {itemOffset + currentItems.length} dari {propertyData.length} Hasil</p>
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
  img, nama, tanggal, harga, luas, tipe, sertifikat,
}) {
  return (
    <div className="grid md:grid-cols-[5rem,_12rem,_1fr,_1fr,_1fr,_1fr] gap-5 py-2 px-4 items-center border-b">
      <div>
        <img src={img} alt="gambar 1" className="rounded-sm opacity-0 pointer-events-none md:opacity-100 w-14" />
      </div>
      <div className="text-sm ">
        <p>{nama}</p>
        <p>{tanggal}</p>
      </div>
      <div className="text-sm">
        <p>{harga}</p>
        <p>Harga</p>
      </div>
      <div className="text-sm">
        <p>{luas}</p>
        <p>Luas</p>
      </div>
      <div className="text-sm">
        <p>{tipe}</p>
        <p>Tipe</p>
      </div>
      <div className="text-sm">
        <p>{sertifikat}</p>
        <p>Sertifikat</p>
      </div>
    </div>
  );
}
