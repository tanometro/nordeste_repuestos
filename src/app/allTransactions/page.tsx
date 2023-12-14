'use client';

import React from 'react'
import Header from '@/src/components/header';
import getAllTransactions from '@/src/components/requests/allTransactions';
import { TransactionInterface } from '@/src/components/interfaces';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import FinalTransactions from '@/src/components/transactions/finalTransactions/finalTransactions';
import MechanicsTransactions from '@/src/components/transactions/mechanicsTransactions/mechanicsTransactions';
import DelFinalTransactions from '@/src/components/transactions/finalTransactions/delFinalTransactions';
import DelMechanicsTransactions from '@/src/components/transactions/mechanicsTransactions/delMechanicsTransactions';


function AllTransacions() {
  const [component, setComponent] = useState(true);
  const [active, setActive] = useState(true);
  const [finalTransactions, setFinalTransactions] = useState<TransactionInterface[]>([]);
  const [mechanicTransactions, setMechhanicTransactions] = useState<TransactionInterface[]>([]);
  const router = useRouter();

    // Cuando monta el componente //
    useEffect(() => {
      async function fetchData() {
        try {
          const transList = await getAllTransactions(20, 10);
          
          const finalTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === true); 
          const mechTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === false);
          
          setFinalTransactions(finalTransList);
          setMechhanicTransactions(mechTransList);
        } catch (error) {
          console.error("Error en render componente", error);
        }
      }
      fetchData();
    }, []);

    const toggleActive = () => {
      setActive(!active);
    };
  return (
    <div className='w-full'>
      <Header title='Todas las transacciones'/>
    
      <div className="flex flex-col items-center w-full">
        {component ? (
          active ? 
          <FinalTransactions finalTransactions={finalTransactions} setFinalTransactions={setFinalTransactions}/> : <DelFinalTransactions finalTransactions={finalTransactions}/>
          ) 
            : 
          (
          active ? <MechanicsTransactions mechanicTransactions={mechanicTransactions} setMechhanicTransactions={setMechhanicTransactions}/> : <DelMechanicsTransactions mechanicTransactions={mechanicTransactions}/>
          )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 mx-auto mb-4 flex justify-center">
        <button
          type="button"
          onClick={() => setComponent(!component)}
          className="w-48 mr-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {component ? "Ver intercambio" : "Ver ventas"}
        </button>
        <button
          type="button"
          onClick={() => router.push('/createTransaction')}
          className="w-48 mx-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Crear nueva
        </button>
        <button
          type="button"
          onClick={toggleActive}
          className="w-48 mx-1 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {active ? "Oper. eliminadas" : "Opera. confirmadas"}
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
  )
}

export default AllTransacions;