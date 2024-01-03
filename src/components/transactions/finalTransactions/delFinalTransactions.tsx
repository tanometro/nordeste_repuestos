'use client';

import React, { useState, useEffect } from 'react';
import { TransactionInterface, SearchParameters } from '@/src/components/interfaces';
import { useRouter } from 'next/navigation';
import Pagination from '@/src/components/pagination';
import filterByMechanic from '@/src/components/requests/filterByMechanic';
import filterByFinalCustomer from '@/src/components/requests/filterByFinalCustomer';
import SearchInput from '@/src/components/inputs/searchInput';
import RenderResult from '@/src/components/renderResult';
import EditButton from '@/src/components/buttons/editButton';
import List from '@/src/components/lists';
import getAllTransactions from '@/src/components/requests/allTransactions';

const DelFinalTransactions = () => {
  const [deletedFinalTransactions, setDeletedFinalTransactions] = useState<TransactionInterface[]>([]);

  // Cuando monta el componente //
  useEffect(() => {
    async function fetchData() {
      try {
        const transList = await getAllTransactions();
        
        const delFinalTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === true)
        .filter((transaction: TransactionInterface) => transaction.status == false); 
        
        setDeletedFinalTransactions(delFinalTransList);
        
 
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);

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

  const searchMechanic = async () => {
    setCurrentPage(1);
    const mechanic = await filterByMechanic(searchByMechanic);    
    const filtered = mechanic.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === true)
    .filter((transaction: TransactionInterface) => transaction.status === false);
    console.log(filtered);
    
    setFilteredTransactions(filtered);   
  }
  const searchClient = async () => {
    setCurrentPage(1);
    const client = await filterByFinalCustomer(searchByClient);
    const filtered = client.filter((transaction: TransactionInterface) => transaction.status === false);
    setFilteredTransactions(filtered);  
  }
  
  useEffect(() => {
    searchMechanic();
  }, [searchByMechanic]);
  useEffect(() => {
    searchClient();
  }, [searchByClient]);

  const transactionShow = searchByClient || searchByMechanic ? filteredTransactions : deletedFinalTransactions;
  
  const render = transactionShow.slice(firstIndex, lastIndex);
  
  
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
            <RenderResult data={render} eliminar='Eliminar'/>
            {/* <List>
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
                    {render.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-100"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-base font-medium">{transaction.id}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedDni}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.finalCustomerName}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleTotalAmount}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleCommissionedAmount}</td>
                  <td>
                    <EditButton title='Ver detalles' onClickfunction={() => router.push(`/detailtransaction/${transaction.id}`)} />
                  </td>
                </tr>
              ))}
                      </tbody>
                  </table>
             </List> */}
              <div className="flex items-center justify-center space-x-4">
                <Pagination data={deletedFinalTransactions} recordsPerPage={pagination} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
              </div>
            </div>
           </div>
          </div>
        </div>
      </div>
  )
}

export default DelFinalTransactions;