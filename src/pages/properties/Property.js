import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { ref, get, update } from 'firebase/database';
import {
  ref as storageRef, uploadBytes, getDownloadURL, deleteObject,
} from 'firebase/storage';
import Swal from 'sweetalert2';
import { ThreeCircles } from 'react-loader-spinner';
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';
import TextArea from '../../components/forms/TextArea';
import DropzoneInput from '../../components/forms/DropzoneInput';
import { database, storage } from '../../utils/firebase';

export default function Property({ isEditable }) {
  const methods = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const propertyRef = ref(database, `daftar-properti/${id}`);
    get(propertyRef).then((snapshot) => {
      if (snapshot.exists()) {
        const propertyData = snapshot.val();
        setProperty(propertyData);
        setIsLoading(true);
      } else {
        console.log('Data properti tidak ditemukan');
      }
    }).catch((error) => {
      console.error('Error:', error);
      setIsLoading(false);
    }).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });
  }, [id]);

  const uploadImage = async (file) => {
    try {
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 8);
      const fileName = `image_${timestamp}_${randomString}.jpg`;
      const storageRe = storageRef(storage, `images/${fileName}`);
      await uploadBytes(storageRe, file);
      const downloadURL = await getDownloadURL(storageRe);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const updateImage = async (file) => {
    try {
      const oldImageUrl = property.image;
      if (oldImageUrl) {
        const fileName = oldImageUrl.split('/').pop();
        const storageRefToDelete = storageRef(storage, `images/${fileName}`);
        try {
          const snapshot = await get(storageRefToDelete);
          if (snapshot.exists()) {
            await deleteObject(storageRefToDelete);
          } else {
            console.warn('Objek tidak ditemukan di Firebase Storage');
          }
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
        }
      }
      const imageUrl = await uploadImage(file, file.name);
      return imageUrl;
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const confirmed = await Swal.fire({
        icon: 'warning',
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin mengubah data ini?',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
      });
      if (confirmed.isConfirmed) {
        setIsLoading(true);
        let imageUrl = property.image;
        if (data.image && data.image[0]) {
          imageUrl = await updateImage(data.image[0]);
        }
        const propertyRef = ref(database, `daftar-properti/${id}`);
        await update(propertyRef, {
          name: data.name || '',
          address: data.address || '',
          description: data.description || '',
          price: data.price || '',
          area: data.area || '',
          accessRoad: data.accessRoad || '',
          type: data.type || '',
          landCertificate: data.landCertificate || '',
          image: imageUrl || '',
        });
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Data berhasil diubah.',
        });
        navigate('/daftar-properti');
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan!',
        text: 'Terjadi kesalahan saat mengubah data.',
      });
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <ThreeCircles color="#4fa94d" height={80} width={80} />
      </div>
    );
  }

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
            disabled={!isEditable}
            defaultValue={property.name}
            validation={{ required: 'Nama tidak boleh kosong' }}
          />
          <Input
            id="address"
            label="Alamat"
            disabled={!isEditable}
            defaultValue={property.address}
            validation={{ required: 'Alamat tidak boleh kosong' }}
          />
          <TextArea
            id="description"
            label="Deskripsi"
            disabled={!isEditable}
            defaultValue={property.description}
            validation={{ required: 'Deskripsi tidak boleh kosong' }}
          />

          <Input
            id="price"
            label="Harga"
            disabled={!isEditable}
            defaultValue={property.price}
            validation={{ required: 'Harga tidak boleh kosong' }}
          />
          <Input
            id="area"
            label="Luas"
            disabled={!isEditable}
            defaultValue={property.area}
            validation={{ required: 'Luas tidak boleh kosong' }}
          />
          <Input
            id="accessRoad"
            label="Akses Jalan"
            disabled={!isEditable}
            defaultValue={property.accessRoad}
            validation={{ required: 'Akses jalan tidak boleh kosong' }}
          />
          <Input
            id="type"
            label="Tipe"
            disabled={!isEditable}
            defaultValue={property.type}
            validation={{ required: 'Tipe tidak boleh kosong' }}
          />
          <Input
            id="landCertificate"
            label="Sertifikat"
            disabled={!isEditable}
            defaultValue={property.landCertificate}
            validation={{ required: 'Sertifikat tidak boleh kosong' }}
          />
          <div className="max-w-sm">
            {!isEditable ? (
              <img src={property.image} alt="Preview" />
            ) : (
              <DropzoneInput
                id="image"
                defaultValue={property.image}
                formId="image_file_id"
                label="Gambar (Ukuran Banner harus 3:1)"
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                helperText="Anda bisa mengupload file .png, .jpg, atau .jpeg, maksimal 300KB"
              />
            )}
          </div>
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
