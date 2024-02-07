'use client';

import React, { useState, useEffect, useRef } from 'react'
import { TransactionInterface, SearchParameters } from '@/src/types/interfaces';
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import getAllTransactions from '../../../requests/allTransactions';
import SearchInput from '../../inputs/searchInput';
import RenderResult from '../../renderResult';
import PrimaryButton from '../../buttons/primaryButton';
import filterByFinalCustomer from '../../../requests/filterByFinalCustomer';
import filterByMechanic from '../../../requests/filterByMechanic';
import { useSession } from 'next-auth/react';

const DelMechanicsTransactions = () => {
  const {data: session} = useSession();
  const [deletedMechanicTransactions, setDeletedMechhanicTransactions] = useState<TransactionInterface[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pagination = 10;
  const [searchByMechanic, setSearchByMechanic] = useState<SearchParameters>({
    dni_or_name: "",
  });
  const [searchByClient, setSearchByClient] = useState<SearchParameters>({
    dni_or_name: "",
  });
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionInterface[]>([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const refOne = useRef<HTMLDivElement | null>(null);

   // Cuando monta el componente //
   useEffect(() => {
    async function fetchData() {
      try {
        const transList = await getAllTransactions(session?.user.token, undefined, undefined, false);
        const delMechTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === false);
    
        setDeletedMechhanicTransactions(delMechTransList);
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);

  const loadMore = async () => {
    try {
      const next = await getAllTransactions(session?.user.token, pagination, currentPage * pagination, false);
      const mechanicTransactions = next.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === false);
      setDeletedMechhanicTransactions((prevTransactions) => [...prevTransactions, ...mechanicTransactions]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error al cargar la siguiente página", error);
    }
  };
    
  const searchMechanic = async () => {
    try {
      const mechanic = await filterByMechanic(session?.user.token, searchByMechanic);
      const filtered = mechanic.filter(
        (transaction) => transaction.status === true
      );
      setFilteredTransactions(filtered);
    } catch (error) {
      console.error("Error en búsqueda de mecánico", error);
    }
  };
  
  const searchClient = async () => {
    try {
      const client = await filterByFinalCustomer(session?.user.token, searchByClient);
      const filtered = client.filter(
        (transaction) => transaction.status === true
      );
      setFilteredTransactions(filtered);
    } catch (error) {
      console.error("Error en búsqueda de cliente", error);
    }
  };
  
  useEffect(() => {
    searchMechanic();
  }, [searchByMechanic]);
  useEffect(() => {
    searchClient();
  }, [searchByClient]);

  const transactionShow =
    (searchByClient.dni_or_name || searchByMechanic.dni_or_name) && filteredTransactions.length > 0
    ? filteredTransactions
    : deletedMechanicTransactions;

  return (
    <div className="flex flex-col items-center h-screen w-full">
         <div className='flex items-center w-full'>
          <div className="flex justify-center mt-12 w-7/12">
            <SearchInput placeholder='Busca por NOMBRE o DNI de mecánico' value={searchByMechanic.dni_or_name} 
            onChangeFunction={(e) => setSearchByMechanic({ ...searchByMechanic, dni_or_name: e.target.value })}
            />
          </div>
          <div className="flex justify-center mt-12 w-7/12">
            <SearchInput placeholder='Busca por NOMBRE o DNI de cliente' value={searchByClient.dni_or_name}
            onChangeFunction={(e) => setSearchByClient({...searchByClient, dni_or_name: e.target.value})}
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
                <RenderResult data={transactionShow}/>
                <div className="flex items-center justify-center space-x-4">
                  <PrimaryButton title='Cargar más' onClickfunction={loadMore}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DelMechanicsTransactions;