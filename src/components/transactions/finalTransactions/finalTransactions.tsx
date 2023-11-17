'use client';

import React from 'react'
import List from '@/src/components/lists';
import deleteTransaction from '@/src/components/requests/deleteTransaction';
import FilterByClient from '../../filtersTransactions/filterByClient';
import FilterByMechanic from '../../filtersTransactions/filterByMechanic';
import { FinalTransactionsProps, TransactionInterface } from '@/src/components/interfaces';
import { useState } from 'react';
import { useRouter } from "next/navigation";

const FinalTransacions: React.FC<FinalTransactionsProps> = (props) => {
  const {finalTransactions, setFinalTransactions}= props;
    
  const [date, setDate] = useState("")
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const [searchByMechanic, setSearchByMechanic] = useState<string>("");
  const [searchByClient, setSearchByClient ] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionInterface[]>([]);
     
    const searchClient = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0);
        setSearchByClient(target.value)
     }

    const searchMechanic = ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearchByMechanic(target.value)
   }
    
    const searchDate = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setDate(target.value);
    }

    const aceptedTransaction = finalTransactions.filter((transaction) => transaction.status == true);

    return (
      <div className='w-full'>
        <div className='flex items-center w-full'>
          <FilterByMechanic filteredTransactions={filteredTransactions} searchMechanic={searchMechanic} searchByMechanic={searchByMechanic} setFilteredTransactions={setFilteredTransactions}/> 
          <FilterByClient searchClient={searchClient} searchByClient={searchByClient} setFilteredTransactions={setFilteredTransactions} />
          <div className="flex justify-center mt-12 w-1/2">
            <input 
              className="rounded-2xl border border-custom-red h-10 w-8/12 text-center text-black"
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
                        <th scope="col" className="px-6 py-4">Número</th>
                        <th scope="col" className="px-6 py-4">Usuario</th>
                        <th scope="col" className="px-6 py-4">Cliente</th>
                        <th scope="col" className="px-6 py-4">Fecha</th>
                        <th scope="col" className="px-6 py-4">Total</th>
                        <th scope="col" className="px-6 py-4">Comisión</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction, index) => (
                          <tr
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-base">{transaction.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.finalCustomerName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base"> {transaction.saleTotalAmount}$</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.saleCommissionedAmount}$</td>
                    <td>
                      <button onClick={() => router.push(`/detailtransaction/${transaction.id}`)}>
                    <a className="text-custom-red px-3">Ver detalles</a>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteTransaction(transaction.id, setFinalTransactions)}>
                    <a className="text-custom-red px-3">Eliminar</a>
                      </button>
                    </td>
                    </tr>
                        ))
                      ) : (
                        aceptedTransaction.map((transaction, index) => (
                          <tr
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-base">{transaction.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.finalCustomerName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base"> {transaction.saleTotalAmount}$</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.saleCommissionedAmount}$</td>
                    <td>
                      <button onClick={() => router.push(`/detailtransaction/${transaction.id}`)}>
                    <a className="text-custom-red px-3">Ver detalles</a>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteTransaction(transaction.id, setFinalTransactions)}>
                    <a className="text-custom-red px-3">Eliminar</a>
                      </button>
                    </td>
                    </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FinalTransacions;