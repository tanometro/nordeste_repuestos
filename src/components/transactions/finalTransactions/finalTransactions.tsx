'use client';

import React from 'react'
import List from '@/src/components/lists';
import deleteTransaction from '@/src/components/requests/deleteTransaction';
import filterByFinalCustomer from '../../requests/filterByFinalCustomer';
import filterByMechanic from '../../requests/filterByMechanic';
import { FinalTransactionsProps, TransactionInterface } from '@/src/components/interfaces';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const FinalTransacions: React.FC<FinalTransactionsProps> = (props) => {
  const {finalTransactions, setFinalTransactions}= props;
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const [searchByMechanic, setSearchByMechanic] = useState<string>("");
  const [filteredByMechanic, setFilteredByMechanic ] = useState<TransactionInterface[]>([]);
  const [searchByClient, setSearchByClient ] = useState<string>("");
  const [filteredByClient, setFilteredByClient ] = useState<TransactionInterface[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionInterface[]>([]);
  
   
    const applyFilters = () => {
      let filteredResult = [...finalTransactions];
  
      if (searchByMechanic.trim() !== "") {
        filteredResult = filteredResult.filter((transaction) =>
          transaction.userAssociatedName.toLowerCase().includes(searchByMechanic.toLowerCase())
        );
      }
 
      if (searchByClient.trim() !== "") {
        filteredResult = filteredResult.filter((transaction) =>
          transaction.finalCustomerName.toLowerCase().includes(searchByClient.toLowerCase())
        );
      }
      
      filteredResult = filteredResult.filter((transaction) => transaction.status === true);
      setFilteredTransactions(filteredResult);
    };

    const searchClient = async ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearchByClient(target.value);
      const client = await filterByFinalCustomer(searchByClient);
      setFilteredByClient(client);
      applyFilters();
   };

  const searchMechanic = async ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearchByMechanic(target.value);
    const mechanic = await filterByMechanic(searchByMechanic);
    setFilteredByMechanic(mechanic);
    applyFilters();
 };

 const hideOnEscape = (e: React.KeyboardEvent) => {
  
  if( e.key === "Escape" ) {
    setOpen(false)
  }
}

const hideOnClickOutside = (e: React.MouseEvent) => {
  if (refOne.current && !refOne.current.contains(e.target as Node)) {
    setOpen(false);
  }
}

    const aceptedTransaction = finalTransactions.filter((transaction) => transaction.status == true);

    return (
      <div className='w-full'>
        <div className='flex items-center w-full'>
          <div className="flex justify-center mt-12 w-7/12">
            <input
              className="rounded-2xl border border-custom-red h-10 w-8/12 text-center text-black"
              placeholder="Busca por NOMBRE o DNI de mecánico"
              type="text"
              value={searchByMechanic}
              onChange={searchMechanic}
            />
          </div>
          <div className="flex justify-center mt-12 w-7/12">
            <input
              className="rounded-2xl border border-custom-red h-10 w-8/12 text-center text-black"
              placeholder="Busca por NOMBRE o DNI de cliente"
              type="text"
              value={searchByClient}
              onChange={searchClient}
            />
          </div>
          <div className="flex justify-center mt-12 w-6/12">
            <div className="calendarWrap">
              <input
                value={`${format(range[0].startDate, 'dd/MM/yyyy')} a ${format(range[0].endDate, "dd/MM/yyyy")}`}
                readOnly
                className="rounded-2xl border border-custom-red h-10 w-full text-center text-black"
                onClick={ () => setOpen(open => !open) }
              />
              <div ref={refOne} >
                {open && 
                  <DateRange
                  onChange={(item) => {
                    const { startDate, endDate } = item.selection;
                    if (startDate !== undefined && endDate !== undefined) {
                      setRange([{ startDate, endDate, key: 'selection' }]);
                    }
                  }}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="horizontal"
                  className="calendarElement"
                />
                }
              </div>
            </div>
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