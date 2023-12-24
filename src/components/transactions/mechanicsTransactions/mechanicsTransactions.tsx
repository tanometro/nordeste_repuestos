'use client';

import React from 'react'
import List from '@/src/components/lists';
import deleteTransaction from '@/src/components/requests/deleteTransaction';
import { MechanicsTransactionsProps, TransactionInterface } from '@/src/components/interfaces';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import filterByMechanic from '../../requests/filterByMechanic';
import Pagination from '../../pagination';
import EditButton from '../../buttons/editButton';

const MechanicsTransactions: React.FC<MechanicsTransactionsProps> = (props) => {
  const {mechanicTransactions, setMechhanicTransactions}= props;
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mechanicFind, setMechanicFind] = useState<TransactionInterface[]>([]);
  const [date, setDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
    
    const searchUser = async ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(0);
        setSearch(target.value);

        const usersFind = await filterByMechanic(search);
        setMechanicFind(usersFind);
     }
    
    const searchDate = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setDate(target.value);
    }

    const aceptedTransaction = mechanicTransactions.filter((transaction) => transaction.status == true);
    const transactionShow = aceptedTransaction.slice(firstIndex, lastIndex);

  return (
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
                    <tr key={index}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                        <td className="whitespace-nowrap px-6 py-4 text-base font-medium">{transaction.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base"> -{transaction.saleTotalAmount}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleCommissionedAmount}</td>
                    <td>
                      <EditButton title='Ver detalles' onClickfunction={() => router.push(`/detailtransaction/${transaction.id}`)}/>
                    </td>
                    <td>
                      <EditButton title='Eliminar' onClickfunction={() => deleteTransaction(transaction.id, setMechhanicTransactions)}/>
                    </td>
                    </tr>
                      ))}
                      </tbody>
                    </table>
                  </List>
                  <div className="flex items-center justify-center mt-6 space-x-4">
                    <Pagination data={aceptedTransaction} recordsPerPage={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                  </div>
            </div>
           </div>
          </div>
        </div>
      </div>
  )
}

export default MechanicsTransactions;