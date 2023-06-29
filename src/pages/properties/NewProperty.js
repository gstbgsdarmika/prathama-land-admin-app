import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';
import TextArea from '../../components/forms/TextArea';
import DropzoneInput from '../../components/forms/DropzoneInput';

export default function NewProperty() {
  const methods = useForm();

  return (
    <section>
      <div>
        <h1 className="text-xl font-semibold text-gray-900 md:text-3xl">
          Tambah Properti
        </h1>
        <p className="text-xs text-gray-700 md:text-sm">
          Tambahkan data properti sesuai dengan data formulir
        </p>
      </div>
      <FormProvider {...methods}>
        <form className="p-4 mt-4 space-y-4 bg-white rounded-md shadow-md md:space-y-4 md:p-8">
          <Input
            id="name"
            label="Nama"
            validation={{ required: 'Name must be filled' }}
          />
          <Input
            id="alamat"
            label="Alamat"
            validation={{ required: 'Name must be filled' }}
          />
          <TextArea
            id="description"
            label="Deskripsi"
            validation={{ required: 'Address must be filled' }}
          />
          <div className="grid gap-4 md:gap-8 md:grid-flow-col md:col-span-3">
            <Input
              id="price"
              label="Price"
              validation={{ required: 'Price must be filled' }}
            />
            <Input
              id="luas"
              label="Luas"
              validation={{ required: 'Price must be filled' }}
            />
            <Input
              id="akses"
              label="Akses Jalan"
              validation={{ required: 'Price must be filled' }}
            />
          </div>
          <div className="md:max-w-sm">
            <DropzoneInput
              id="photo"
              label="Gambar (Ukuran Banner harus 3:1)"
              validation={{ required: 'Photo must be filled' }}
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
              helperText="Anda dapat mengunggah file dengan ekstensi .png, .jpg, atau .jpeg."
            />
          </div>
        </form>
        <div className="flex flex-wrap justify-end gap-2 mt-5 md:mt-10 md:gap-4">
          <Link to="/daftar-properti">
            <Button variant="outline">Kembali</Button>
          </Link>
          <Link to="/daftar-properti">
            <Button type="submit">Tambah</Button>
          </Link>
        </div>
      </FormProvider>
    </section>
  );
}
