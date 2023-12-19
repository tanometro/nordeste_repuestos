'use client';

import React, {useEffect} from 'react'
import filterByFinalCustomer from '../../requests/filterByFinalCustomer';
import filterByMechanic from '../../requests/filterByMechanic';
import { FinalTransactionsProps, TransactionInterface, SearchParameters } from '@/src/components/interfaces';
import { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { isWithinInterval } from 'date-fns';
import deleteTransaction from '../../requests/deleteTransaction';
import List from '../../lists';
import Pagination from '../../pagination';
import EditButton from '../../buttons/editButton';

const FinalTransactions: React.FC<FinalTransactionsProps> = (props) => {
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
  const router = useRouter();

  const [searchByMechanic, setSearchByMechanic] = useState<SearchParameters>({
    dni_or_name: "",
  });
  const [searchByClient, setSearchByClient] = useState<SearchParameters>({
    dni_or_name: "",
  });
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionInterface[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = 10;
  const lastIndex = currentPage * pagination;
  const firstIndex = lastIndex - pagination;

  // const fetchData = async () => {
  //   const mechanic = await filterByMechanic(searchByMechanic);
  //   console.log(searchByMechanic);
    
  //   const client = await filterByFinalCustomer(searchByClient);
  //   console.log(client);
    
  //   const toShow = [...mechanic, ...client];
  //   setFilteredTransactions(toShow);    
    
  // };

  const searchMechanic = async () => {
    setCurrentPage(1);
    const mechanic = await filterByMechanic(searchByMechanic);
    setFilteredTransactions(mechanic); 
      
  }
  const searchClient = async () => {
    setCurrentPage(1);
    const client = await filterByFinalCustomer(searchByClient);
    setFilteredTransactions(client);  
  }
  
  useEffect(() => {
    searchMechanic();
  }, [searchByMechanic]);
  useEffect(() => {
    searchClient();
  }, [searchByClient]);
  

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

const rangeChange = (item: any) => {
  setRange([item.selection]);
}

    const aceptedTransaction = finalTransactions.filter((transaction) => transaction.status == true);
    const transactionShow = aceptedTransaction.slice(firstIndex, lastIndex);

    const toShow = searchByClient || searchByMechanic? filteredTransactions : transactionShow

    return (
      <div className='w-full mb-24'>
        <div className='flex items-center w-full'>
          <div className="flex justify-center mt-12 w-7/12">
            <input
              className="rounded-2xl border border-custom-red h-10 w-8/12 text-center text-black"
              placeholder="Busca por NOMBRE o DNI de mecánico"
              type="text"
              value={searchByMechanic.dni_or_name}
              onChange={(e) => setSearchByMechanic({ ...searchByMechanic, dni_or_name: e.target.value })}
            />
          </div>
          <div className="flex justify-center mt-12 w-7/12">
            <input
              className="rounded-2xl border border-custom-red h-10 w-8/12 text-center text-black"
              placeholder="Busca por NOMBRE o DNI de cliente"
              type="text"
              value={searchByClient.dni_or_name}
              onChange={(e) => setSearchByClient({...searchByClient, dni_or_name: e.target.value})}
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
                        <th scope="col" className="px-6 py-4">Numero</th>
                        <th scope="col" className="px-6 py-4">Usuario</th>
                        <th scope="col" className="px-6 py-4">DNI</th>
                        <th scope="col" className="px-6 py-4">Cliente</th>
                        <th scope="col" className="px-6 py-4">Fecha</th>
                        <th scope="col" className="px-6 py-4">Total</th>
                        <th scope="col" className="px-6 py-4">Comisión</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionShow.map((transaction) => (
                    <tr key={transaction.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-100">
                        <td className="whitespace-nowrap px-6 py-4 text-base font-medium">{transaction.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedDni}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.finalCustomerName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleTotalAmount}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleCommissionedAmount}</td>
                        <td>
                          <EditButton title='Ver detalles' onClickfunction={() => router.push(`/detailtransaction/${transaction.id}`)}/>
                        </td>
                        <td>
                          <EditButton title='Eliminar' onClickfunction={() => deleteTransaction(transaction.id, setFinalTransactions)}/>
                        </td>  
                    </tr>
                      ))}
                    </tbody>
                  </table>
                </List>
                <div className="flex items-center justify-center space-x-4">
                 <Pagination data={aceptedTransaction} recordsPerPage={pagination} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FinalTransactions;