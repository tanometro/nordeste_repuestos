'use client';

import React, { useState, useEffect } from 'react';
import { SearchParameters, TransactionInterface } from '@/src/components/interfaces';
import { useRouter } from "next/navigation";
import List from '../../lists';
import Pagination from '../../pagination';
import EditButton from '../../buttons/editButton';
import SearchInput from '../../inputs/searchInput';
import getAllTransactions from '../../requests/allTransactions';
import filterByFinalCustomer from '../../requests/filterByFinalCustomer';
import filterByMechanic from '../../requests/filterByMechanic';

const DelMechanicsTransactions = () => {
  
  const [deletedMechanicTransactions, setDeletedMechhanicTransactions] = useState<TransactionInterface[]>([]);

   // Cuando monta el componente //
   useEffect(() => {
    async function fetchData() {
      try {
        const transList = await getAllTransactions(200, 0);
        const deletedMechTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === false)
        .filter((transaction: TransactionInterface) => transaction.status == false);
    
        setDeletedMechhanicTransactions(deletedMechTransList);
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
  const [date, setDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

    const searchDate = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setDate(target.value);
    }

    const transactionShow = deletedMechanicTransactions.slice(firstIndex, lastIndex);

    const searchMechanic = async () => {
      setCurrentPage(1);
      const mechanic = await filterByMechanic(searchByMechanic);
      const filtered = mechanic.filter((transaction) => transaction.status === false)
      .filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === false);
      setFilteredTransactions(filtered); 
        
    }
    const searchClient = async () => {
      setCurrentPage(1);
      const client = await filterByFinalCustomer(searchByClient);
      const filtered = client.filter((transaction) => transaction.status === false);
      setFilteredTransactions(filtered);  
    }
    
    useEffect(() => {
      searchMechanic();
    }, [searchByMechanic]);
    useEffect(() => {
      searchClient();
    }, [searchByClient]);

  return (
    <div className='w-full'>
      <div className="flex flex-col items-center h-screen w-full">
        <div className='flex items-center w-full'>
            <div className="flex justify-center mt-12 w-1/2">
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
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-100">
                    <td className="whitespace-nowrap px-6 py-4 text-base font-medium">{transaction.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleTotalAmount}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleCommissionedAmount}</td>
                    <td>
                      <EditButton title='Ver detalles' onClickfunction={() => router.push(`/detailtransaction/${transaction.id}`)}/>
                    </td>
                </tr>
                      ))}
                </tbody>
            </table>
        </List>
                  <div className="flex items-center justify-center mt-6 space-x-4">
                    <Pagination data={deletedMechanicTransactions} recordsPerPage={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
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