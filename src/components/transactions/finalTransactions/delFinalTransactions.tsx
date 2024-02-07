'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TransactionInterface, SearchParameters } from '@/src/types/interfaces';
import PrimaryButton from '../../buttons/primaryButton';
import filterByMechanic from '@/src/requests/filterByMechanic';
import filterByFinalCustomer from '@/src/requests/filterByFinalCustomer';
import SearchInput from '@/src/components/inputs/searchInput';
import RenderResult from '@/src/components/renderResult';
import getAllTransactions from '@/src/requests/allTransactions';
import { addDays } from 'date-fns'
import { useSession } from 'next-auth/react';

const DelFinalTransactions = () => {
  const [deletedFinalTransactions, setDeletedFinalTransactions] = useState<TransactionInterface[]>([]);
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
  const {data: session} = useSession();

  // Cuando monta el componente //
  useEffect(() => {
    async function fetchData() {
      try {
        const transList = await getAllTransactions(session?.user.token, undefined, undefined, false);
        const delFinalTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === true);
        setDeletedFinalTransactions(delFinalTransList);
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);

  const loadMore = async () => {
    try {
      const next = await getAllTransactions(session?.user.token, pagination, currentPage * pagination, false);
      const deletedNext = next.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === true);
      setDeletedFinalTransactions((prevTransactions) => [...prevTransactions, ...deletedNext]); 
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error al cargar la siguiente página", error);
    }
  };
  
  const searchMechanic = async () => {
    // let parameters = {
    //   sessionToken: session?.user.token,
    //   dni_or_name: searchByMechanic,
    // }
    try {
      const mechanic = await filterByMechanic(session?.user.token, searchByMechanic);
      const filtered = mechanic.filter(
        (transaction) => transaction.status === false
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
        (transaction) => transaction.status === false
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

  const transactionShow =
    (searchByClient.dni_or_name || searchByMechanic.dni_or_name) && filteredTransactions.length > 0
    ? filteredTransactions
    : deletedFinalTransactions;

  return (
    <div className='w-full mb-24'>
      <div className='flex items-center w-full'>
        <div className="flex justify-center mt-12 w-7/12">
          <SearchInput placeholder='Busca por NOMBRE o DNI de mecánico' value={searchByMechanic.dni_or_name} 
            onChangeFunction={(e) => setSearchByMechanic({ ...searchByMechanic, dni_or_name: e.target.value })}
          />
        </div>
        <div className="flex justify-center mt-12 w-1/2">
          <SearchInput placeholder='Busca por NOMBRE o DNI de cliente' value={searchByClient.dni_or_name}
            onChangeFunction={(e) => setSearchByClient({...searchByClient, dni_or_name: e.target.value})}
          />
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

export default DelFinalTransactions;