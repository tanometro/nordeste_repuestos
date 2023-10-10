'use client';

import React from 'react'
import Header from '@/components/header';
import List from '@/components/lists';
import { useState } from 'react';
import { useRouter } from "next/navigation";

function AllTransacions() {
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const router = useRouter();

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
                      <th className="">Numero</th>
                      <th className="">Usuario</th>
                      <th className="">Fecha</th>
                      <th className="">Total</th>
                      <th className="">Comisión</th>
                    </tr>
                </thead>
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