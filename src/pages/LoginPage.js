// import { HiUser, HiLockClosed } from 'react-icons/hi2';
// import { useNavigate } from 'react-router-dom';
// import Button from '../components/buttons/Button';
// import imageLogin from '../assets/img/login.png';

// function LoginPage() {
//   const navigate = useNavigate();

//   function handleLogin() {
//     navigate('/dasboard');
//   }

//   return (
//     <section className="bg-gray-200">
//       <div className="grid items-center justify-center max-w-5xl grid-cols-2 mx-auto overflow-hidden md:h-screen">
//         <div className="flex flex-col justify-between col-span-1 p-10 bg-white rounded-s-md">
//           <h1 className="text-2xl font-semibold">Login</h1>
//           <p className="pb-6 text-base">Sign in to your account </p>
//           <form className="space-y-4 md:space-y-6" action="#">
//             <div className="inline-flex w-full border rounded-md">
//               <div className="p-2 bg-gray-100">
//                 <HiUser className="w-6 h-6 text-gray-800" />
//               </div>
//               <input
//                 type="text"
//                 className="p-2 focus:outline-none focus:text-gray-600"
//                 placeholder="Username"
//               />
//             </div>
//             <div className="inline-flex w-full border rounded-md">
//               <div className="p-2 bg-gray-100">
//                 <HiLockClosed className="w-6 h-6 text-gray-800" />
//               </div>
//               <input
//                 type="password"
//                 className="p-2 focus:outline-none focus:text-gray-600"
//                 placeholder="Password"
//               />
//             </div>
//             <div className="flex justify-end">
//               <Button variant="primary" onClick={handleLogin}>Masuk</Button>
//             </div>
//           </form>
//         </div>
//         <div className="flex flex-col justify-center col-span-1 rounded-e-md ">
//           <img
//             src={imageLogin}
//             alt="gambar"
//             className=" rounded-e-md md:max-h-[340px]"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default LoginPage;
