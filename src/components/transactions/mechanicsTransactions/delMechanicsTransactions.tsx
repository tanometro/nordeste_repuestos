'use client';

import React from 'react';
import { DeletedMechanicsTransactionsProps } from '@/src/components/interfaces';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import List from '../../lists';

const DelMechanicsTransactions: React.FC<DeletedMechanicsTransactionsProps> = (props) => {
  const {mechanicTransactions}= props;
  const router = useRouter();  
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

    const searchDate = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setDate(target.value);
    }

    const deletedTransaction = mechanicTransactions.filter((transaction) => transaction.status == false);
    const transactionShow = deletedTransaction.slice(firstIndex, lastIndex);
    const npage = Math.ceil(deletedTransaction.length / recordsPerPage);
    const numbers: number[] = [];
      for (let i = 1; i <= npage; i++) {
        numbers.push(i);
    }
    const prevPage = () => {
      if(currentPage !== 1) {
        setCurrentPage(currentPage - 1)
      }
    }; 

    const nextPage = () => {
      if(currentPage !== npage) {
        setCurrentPage(currentPage + 1)
      }
    };

    const changePage = (id: number) => {
      setCurrentPage(id)
    };


    const searchUser = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0);
        setSearch(target.value)
    }

  return (
    <div className='w-full'>
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
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                <List>
            <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                        <th scope="col" className="px-6 py-4">Numero</th>
                        <th scope="col" className="px-6 py-4">Usuario</th>
                        <th scope="col" className="px-6 py-4">Fecha</th>
                        <th scope="col" className="px-6 py-4">Total</th>
                        <th scope="col" className="px-6 py-4">Comisión</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionShow.map((transaction, index) => (
                <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-100">
                    <td className="whitespace-nowrap px-6 py-4 text-base font-medium">{transaction.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleTotalAmount}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleCommissionedAmount}</td>
                    <td>
                      <button onClick={() => router.push(`/detailtransaction/${transaction.id}`)}>
                        <a className="text-custom-red px-3">Ver detalles</a>
                      </button>
                    </td>
                </tr>
                      ))}
                </tbody>
            </table>
        </List>
                  <div className="flex items-center justify-center mt-6 space-x-4">
                      <button
                        type="button"
                        onClick={prevPage}
                        className="w-24 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Anteriores
                      </button>
                      {
                        numbers.map((n, i) => (
                          <div className='text-black flex items-center'>
                            <button
                              key={i}
                              onClick={() => changePage(n)}
                              className="text-red mx-2"
                            >
                              {n}
                            </button>
                          </div>
                        ))
                      }
                      <button
                        type="button"
                        onClick={nextPage}
                        className="w-24 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Siguientes
                      </button>
                    </div>  
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DelMechanicsTransactions;