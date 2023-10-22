import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Input from '../components/forms/Input';
import firebaseApp from '../utils/firebase';
import Button from '../components/buttons/Button';
import imageLogin from '../assets/img/login.png';

function Login() {
  const methods = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Anda telah berhasil login!',
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error:', errorCode, errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: 'Email atau password salah. Silakan coba lagi.',
        });
      });
  }

  return (
    <section className="bg-gray-200">
      <div className="grid items-center justify-center h-screen max-w-5xl grid-cols-1 mx-auto overflow-hidden md:grid-cols-2">
        <div className="flex flex-col justify-between p-4 mx-20 bg-white rounded-lg md:col-span-1 md:h-2/3 md:p-10 md:rounded-s-md md:mx-0 md:rounded-none">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="-mt-2 text-base">Masuk ke akun Anda </p>
          </div>
          <FormProvider {...methods}>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={methods.handleSubmit(handleLogin)}
            >
              <Input
                id="email"
                type="email"
                placeholder="Email"
                validation={{ required: 'email tidak boleh kosong' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <Input
                id="password"
                placeholder="Password"
                type="password"
                validation={{ required: 'email tidak boleh kosong' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </form>
          </FormProvider>
          <div className="flex justify-end pt-4">
            <Button variant="primary" onClick={handleLogin}>
              Masuk
            </Button>
          </div>
        </div>

        <div className="flex-col justify-center hidden md:flex md:h-full">
          <img
            src={imageLogin}
            alt="gambar"
            className="rounded-e-md md:h-2/3"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
