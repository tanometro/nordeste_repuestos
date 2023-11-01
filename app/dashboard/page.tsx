"use client";
import { useRouter } from 'next/navigation';
import Header from '@/app/components/header';
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const storedToken = localStorage.getItem('token');
  const router = useRouter();
  const defaultCommission = 5
  const { data: session, status } = useSession();

  const logOut = async () => {
    try {
      localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      throw new Error("Fallo en logout ");
    }
  }

  return (
    <div>
      <Header title="Dashboard" />
      {/* <h1 className='text-black'>hola {storedToken}</h1> */}
      <div className="h-full w-full my-6">
        <div className='flex flex-col mt-32 items-center'>
          <div className='justify-arround '>
            <button onClick={() => router.push('/allUsers')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Usuarios
            </button>
            <button onClick={() => router.push('/createUsers')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Crear usuario
            </button>
          </div>
          <div className='flex justify-arround'>
            <button onClick={() => router.push('/transactions')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Transacciones
            </button>
            <button onClick={() => router.push('/createTransaction')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Crear transacción
            </button>
          </div>
          <div className='flex justify-arround '>
            <button onClick={logOut}
              className="w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Salir
            </button>
          </div>
          <div className='mt-12 flex flex-row'>
          <span className='text-black mr-3'>Comisión por defecto:</span>
          <button className="mb-10 w-6 h-6 flex items-center justify-center text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            -
          </button>

          <div className='text-black items-center justify-center mx-4'>
            {defaultCommission}
          </div>

          <button className="mb-10 w-6 h-6 flex items-center justify-center text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            +
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

