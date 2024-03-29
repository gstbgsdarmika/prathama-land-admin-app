import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import swal from 'sweetalert2';
import { ref, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';
import TextArea from '../../components/forms/TextArea';
import DropzoneInput from '../../components/forms/DropzoneInput';
import { database, storage } from '../../utils/firebase';

export default function NewProperty() {
  const methods = useForm();
  const navigate = useNavigate();

  const uploadImage = async (file) => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = `image_${timestamp}_${randomString}.jpg`;
    const storageRe = storageRef(storage, `images/${fileName}`);
    await uploadBytes(storageRe, file);
    const downloadURL = await getDownloadURL(storageRe);
    return downloadURL;
  };

  const onSubmit = async (data) => {
    try {
      const imageUrl = await uploadImage(data.image[0]);
      const propertiesRef = ref(database, 'daftar-properti');
      push(propertiesRef, {
        name: data.name,
        address: data.address,
        description: data.description,
        price: data.price,
        area: data.area,
        accessRoad: data.accessRoad,
        type: data.type,
        landCertificate: data.landCertificate,
        image: imageUrl,
      }).then(() => {
        swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Data berhasil diunggah.',
        });
        navigate('/daftar-properti');
      });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Kesalahan!',
        text: 'Terjadi kesalahan saat mengunggah gambar atau menyimpan data.',
      });
      console.error('Error saat mengunggah gambar atau menyimpan data:', error);
    }
  };

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
        <form
          className="p-4 mt-4 space-y-4 bg-white rounded-md shadow-md md:space-y-4 md:p-8"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input
            id="name"
            label="Nama"
            validation={{ required: 'Nama tidak boleh kosong' }}
          />
          <Input
            id="address"
            label="Alamat"
            validation={{ required: 'Alamat tidak boleh kosong' }}
          />
          <TextArea
            id="description"
            label="Deskripsi"
            validation={{ required: 'Deskripsi tidak boleh kosong' }}
          />

          <Input
            id="price"
            label="Harga"
            validation={{ required: 'Harga tidak boleh kosong' }}
          />
          <Input
            id="area"
            label="Luas"
            validation={{ required: 'Luas tidak boleh kosong' }}
          />
          <Input
            id="accessRoad"
            label="Akses Jalan"
            validation={{ required: 'Akses jalan tidak boleh kosong' }}
          />
          <Input
            id="type"
            label="Tipe"
            validation={{ required: 'Tipe tidak boleh kosong' }}
          />
          <Input
            id="landCertificate"
            label="Sertifikat"
            validation={{ required: 'Sertifikat tidak boleh kosong' }}
          />
          <div className="max-w-sm">
            <DropzoneInput
              id="image"
              label="Gambar (Ukuran Banner harus 3:1)"
              validation={{ required: 'Photo must be filled' }}
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
              helperText="Anda bisa mengupload file .png, .jpg, atau .jpeg, maksimal 300KB"
            />
          </div>
          <div className="flex flex-wrap justify-end gap-2 mt-5 md:mt-10 md:gap-4">
            <Link to="/daftar-properti">
              <Button variant="outline">Kembali</Button>
            </Link>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
