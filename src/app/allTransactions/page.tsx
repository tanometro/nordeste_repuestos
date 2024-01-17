'use client';

import React, { useLayoutEffect } from 'react'
import Header from '@/src/components/header';
import getAllTransactions from '@/src/components/requests/allTransactions';
import { TransactionInterface } from '@/src/components/interfaces';
import { useState, useEffect } from 'react';
import { redirect, useRouter } from "next/navigation";
import FinalTransactions from '@/src/components/transactions/finalTransactions/finalTransactions';
import MechanicsTransactions from '@/src/components/transactions/mechanicsTransactions/mechanicsTransactions';
import DelFinalTransactions from '@/src/components/transactions/finalTransactions/delFinalTransactions';
import DelMechanicsTransactions from '@/src/components/transactions/mechanicsTransactions/delMechanicsTransactions';
import PrimaryButton from '@/src/components/buttons/primaryButton';
import { isAuthenticated } from '../AuthWellDone';


function AllTransacions() {

  useLayoutEffect(() => {
    const isAuth = isAuthenticated;
    if (!isAuth) {
      redirect("/Unauthorized")
    }
  }, [])
  
  const [component, setComponent] = useState(true);
  const [active, setActive] = useState(true);
  //const [finalTransactions, setFinalTransactions] = useState<TransactionInterface[]>([]);
  //const [mechanicTransactions, setMechhanicTransactions] = useState<TransactionInterface[]>([]);
  const router = useRouter();

    // // Cuando monta el componente //
    // useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       const transList = await getAllTransactions(200, 0);
          
    //       const finalTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === true); 
    //       const mechTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === false);
          
    //       setFinalTransactions(finalTransList);
    //       setMechhanicTransactions(mechTransList);
    //     } catch (error) {
    //       console.error("Error en render componente", error);
    //     }
    //   }
    //   fetchData();
    // }, []);

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