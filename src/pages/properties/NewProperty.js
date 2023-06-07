import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';
import TextArea from '../../components/forms/TextArea';
import DropzoneInput from '../../components/forms/DropzoneInput';

export default function NewProperty() {
  const methods = useForm();

  return (
    <section>
      <div className="diskripsi">
        <h1 className="text-3xl font-semibold text-gray-900">
          Tambah Properti
        </h1>
        <p className="text-sm text-gray-600">
          Tambahkan data properti sesuai dengan data formulir
        </p>
      </div>
      <div>
        <FormProvider {...methods}>
          <form className="p-8 mt-8 space-y-6 bg-white rounded-md shadow-md">
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
            <div className="grid grid-flow-col col-span-3 gap-8">
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
            <div className="max-w-sm">
              <DropzoneInput
                id="photo"
                label="Gambar (Ukuran Banner harus 3:1)"
                validation={{ required: 'Photo must be filled' }}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                helperText="You can upload file with .png, .jpg, atau .jpeg extension."
              />
            </div>
          </form>
          <div className="flex flex-wrap justify-end gap-4 mt-10">
            <Button variant="outline">Kembali</Button>
            <Button type="submit">Tambah</Button>
          </div>
        </FormProvider>
      </div>
    </section>
  );
}
