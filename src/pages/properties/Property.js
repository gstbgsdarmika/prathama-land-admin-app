import * as React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';
import TextArea from '../../components/forms/TextArea';
import { properties } from '../../utils/data';

export default function Property({ isEditable }) {
  const methods = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const propertyIndex = properties.findIndex((prop) => prop.id === Number(id));

  if (propertyIndex === -1) {
    return <div>Data properti tidak ditemukan</div>;
  }
  const property = properties[propertyIndex];

  const onSubmit = (data) => {
    const updatedProperty = {
      id: data.id,
      name: data.name,
      address: data.address,
      description: data.description,
      price: data.price,
      area: data.area,
      accessRoad: data.accessRoad,
      landCertificate: data.landCertificate,
      image: null,
    };

    const updatedProperties = [...properties];
    updatedProperties[propertyIndex] = updatedProperty;
    navigate('/daftar-properti');
  };

  return (
    <section>
      <div>
        <h1 className="text-xl font-semibold text-gray-900 md:text-3xl">
          Detail Properti
        </h1>
        <p className="text-xs text-gray-700 md:text-sm">
          Informasi data properti sesuai dengan data formulir
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          className="p-4 mt-4 space-y-4 bg-white rounded-md shadow-md md:space-y-4 md:p-8"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input
            id="name"
            label="Nama"
            defaultValue={property.name}
            disabled={!isEditable} // Ganti disabled berdasarkan isEditable
            validation={{ required: 'Nama tidak boleh kosong' }}
          />
          <Input
            id="address"
            label="Alamat"
            defaultValue={property.address}
            disabled={!isEditable}
            validation={{ required: 'Alamat tidak boleh kosong' }}
          />
          <TextArea
            id="description"
            label="Deskripsi"
            defaultValue={property.description}
            disabled={!isEditable}
            validation={{ required: 'Deskripsi tidak boleh kosong' }}
          />

          <Input
            id="price"
            label="Harga"
            defaultValue={property.price}
            disabled={!isEditable}
            validation={{ required: 'Harga tidak boleh kosong' }}
          />
          <Input
            id="area"
            label="Luas"
            defaultValue={property.area}
            disabled={!isEditable}
            validation={{ required: 'Luas tidak boleh kosong' }}
          />
          <Input
            id="accessRoad"
            label="Akses Jalan"
            defaultValue={property.accessRoad}
            disabled={!isEditable}
            validation={{ required: 'Akses jalan tidak boleh kosong' }}
          />
          <Input
            id="type"
            label="Tipe"
            defaultValue={property.type}
            disabled={!isEditable}
            validation={{ required: 'Tipe tidak boleh kosong' }}
          />
          <Input
            id="landCertificate"
            label="Sertifikat"
            defaultValue={property.landCertificate}
            disabled={!isEditable}
            validation={{ required: 'Sertifikat tidak boleh kosong' }}
          />

          <div className="flex flex-wrap justify-end gap-2 mt-5 md:mt-10 md:gap-4">
            <Link to="/daftar-properti">
              <Button variant="outline">Kembali</Button>
            </Link>
            {isEditable && (
              <Button type="submit">Simpan</Button>
            )}
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
