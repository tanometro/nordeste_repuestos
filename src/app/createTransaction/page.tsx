'use client';

import React, { useState } from 'react'
import Header from '@/src/components/header';
import Trueque from '@/src/components/trueque';
import NewSell from '@/src/components/sell';
import { useRouter } from 'next/navigation';

function CreateTransaction() {
  const router = useRouter();
  const [select, setSelect] = useState(true);

  const changeSelect = () => {
    setSelect(!select);
  }
  return (
    <div>
        <Header title='Nueva transacción'/>
        <div className='items-center w-full flex flex-col'>
          <button type="button" onClick={changeSelect} 
          className="w-auto px-9 my-12 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          {select == true ? "Cambiar a intercambio con mecánico" : "Cambiar a venta"}
          </button>
          {
          select == true ?
          (<NewSell/>
          ) :
          (
            <Trueque/>
          )
          }
          <div className="fixed bottom-0 left-0 right-0 mx-auto mb-4 flex justify-center">
            <button
              type="button"
              onClick={() => router.push('/allTransactions')}
              className="w-48 ml-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Ver transacciones
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="w-48 ml-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Ir al inicio
            </button>
      </div>
        </div>
        
    </div>
  )
}

export default CreateTransaction;