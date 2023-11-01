'use client';

import React from 'react'
import Header from '@/src/app/components/header';
import List from '@/src/app/components/lists';
import getAllTransactions from '@/src/app/components/requests/allTransactions';
import deleteTransaction from '@/src/app/components/requests/deleteTransaction';
import { TransactionInterface } from '@/src/app/components/interfaces';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";


function AllTransacions() {
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
    const router = useRouter();

    // Cuando monta el componente //
    useEffect(() => {
      async function fetchData() {
        try {
          const transList = await getAllTransactions();
          setTransactions(transList);
        } catch (error) {
          console.error("Error en render componente", error);
        }
      }
      fetchData();
    }, []);

    // const filteredTransaction = transactions.filter((transaction) => {
    //     const lowercaseSearchTerm = search.toLowerCase();
    //     return (
    //       (transaction.dni && transaction.dni.toLowerCase().includes(lowercaseSearchTerm)) ||
    //       (transaction.name && transaction.name.toLowerCase().includes(lowercaseSearchTerm))
    //     );
    //   });

    const searchUser = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0);
        setSearch(target.value)
     }
    
    const searchDate = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setDate(target.value);
    }
  return (
    <div className='w-full'>
        <Header title='Todas las transacciones'/>
        <div className="flex flex-col items-center h-screen w-full">
            <div className='flex items-center w-full'>
                <div className="flex justify-center mt-12 w-1/2">
                    <input 
                    className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black"
                    placeholder="Busca por NOMBRE o DNI"
                    type="text"
                    value={search}
                    onChange={searchUser}
                    />
                </div>
                <div className="flex justify-center mt-12 w-1/2">
                    <input 
                    className="rounded-2xl border border-custom-red h-10 w-1/2 text-center text-black"
                    placeholder="Desde"
                    type="date"
                    value={date}
                    onChange={searchDate}
                    />
                </div>
            </div>
            <List>
                <table>
                <thead>
                <tr className="border-b border-gray">
                      <th className="px-5">Numero</th>
                      <th className="px-5">Usuario</th>
                      <th className="px-5">Fecha</th>
                      <th className="px-5">Total</th>
                      <th className="px-5">Comisión</th>
                    </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-100">
                    <td className="">{transaction.id}</td>
                    <td className="">{transaction.userAssociatedName}</td>
                    <td>{transaction.created.toLocaleDateString()}</td>
                    <td className=""> {transaction.saleTotalAmount}</td>
                    <td className=""> {transaction.saleCommissionedAmount}</td>
                    <td>
                      <button onClick={() => router.push(`/transaction/detail/${transaction.id}`)}>
                        <a className="text-blue-500 px-3">Ver detalles</a>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteTransaction(transaction.id, setTransactions)}>
                        <a className="text-blue-500 px-3">Eliminar</a>
                      </button>
                    </td>
                </tr>
                ))}
                  </tbody>
                </table>
            </List>
            <div className="flex mx-4">
                  <button type="button" onClick={() => router.push('/newTransaction')} 
                  className="w-48 mt-10 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Crear nueva
                  </button>
                  <button type="button" onClick={() => router.push('/deactivatedTransactions')} 
                  className="mx-12 w-48 mt-10 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Transacciones eliminados
                  </button>
                  <button type="button" onClick={() => router.push('/dashboard')} 
                  className="w-48 mt-10 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Ir al inicio
                  </button>
                </div>
        </div>
    </div>
  )
}

export default AllTransacions;