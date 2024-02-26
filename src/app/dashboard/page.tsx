"use client";
import { useRouter } from 'next/navigation';
import Header from '@/src/components/header';
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const defaultCommission = 5
  const { data: session } = useSession();
  const name = session?.user?.user.name;

  return (
    <div>
      <Header title="Dashboard" />
      <div className='flex flex-row items-center mt-12 ml-12 py-3 px-3'>
      <Image
        width={50}
        height={50}
        priority
        src='/usuario.svg'
        alt='Usuario'
        className='flex rounded-3xl relative overflow-hidden w-50 h-50 hover:shadow-xl hover:shadow-blue-300 transition-shadow transform-gpu hover:scale-105 hover:brightness-110'
      />
        <h1 className='text-black inline-block ml-2 border-b border-slate-500 pb-1'>
          Bienvenido {name}
        </h1>
      </div>
      <div className="h-full w-full my-2">
        <div className='flex flex-col mt-12 items-center'>
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
            <button onClick={() => router.push('/allTransactions')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Transacciones
            </button>
            <button onClick={() => router.push('/createTransaction')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Crear transacción
            </button>
          </div>
          <div className='flex justify-arround '>
            <button onClick={() => router.push('/auditoria')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Auditoría
            </button>
            <button 
            onClick={() => signOut()}
            className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
};