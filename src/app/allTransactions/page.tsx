'use client';

import React, { useState } from 'react'
import Header from '@/src/components/header';
import { useRouter } from "next/navigation";
import FinalTransactions from '@/src/components/transactions/finalTransactions/finalTransactions';
import MechanicsTransactions from '@/src/components/transactions/mechanicsTransactions/mechanicsTransactions';
import DelFinalTransactions from '@/src/components/transactions/finalTransactions/delFinalTransactions';
import DelMechanicsTransactions from '@/src/components/transactions/mechanicsTransactions/delMechanicsTransactions';
import PrimaryButton from '@/src/components/buttons/primaryButton';


function AllTransacions() {
  const [component, setComponent] = useState(true);
  const [active, setActive] = useState(true);
  const router = useRouter();

    const toggleActive = () => {
      setActive(!active);
    };
  return (
    <div className='w-full'>
      <Header title='Todas las transacciones'/>
      <div className="flex flex-col items-center w-full">
        {component ? (
          active ? 
          <FinalTransactions/> : <DelFinalTransactions/>
          ) 
            : 
          (
          active ? <MechanicsTransactions/> : <DelMechanicsTransactions/>
          )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 mx-auto mb-4 flex justify-center">
        <PrimaryButton title={component ? "Ver intercambio" : "Ver ventas"} onClickfunction={() => setComponent(!component)}/>
        <PrimaryButton title='Crear nueva' onClickfunction={() => router.push('/createTransaction')}/>
        <PrimaryButton title={active ? "Oper. eliminadas" : "Oper. confirmadas"} onClickfunction={toggleActive}/>
        <PrimaryButton title='Ir al inicio' onClickfunction={() => router.push('/dashboard')}/>
      </div>
    </div>
  )
}

export default AllTransacions;