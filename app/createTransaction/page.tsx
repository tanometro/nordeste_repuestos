'use client';

import React, { useState } from 'react'
import Header from '@/app/components/header';
import Trueque from '@/app/components/trueque';
import NewSell from '@/app/components/sell';

function CreateTransaction() {
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
        </div>
        
    </div>
  )
}

export default CreateTransaction;