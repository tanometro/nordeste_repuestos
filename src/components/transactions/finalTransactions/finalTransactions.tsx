'use client';
//librería de rsuitejs.com -> components -> date-range-picker
import React, {useEffect, useState} from 'react'
import filterByFinalCustomer from '../../../requests/filterByFinalCustomer';
import filterByMechanic from '../../../requests/filterByMechanic';
import { TransactionInterface, SearchParameters,  } from '@/src/types/interfaces';
import DateRange from '../../inputs/dateRangeInput';
import RenderResult from '../../renderResult';
import SearchInput from '../../inputs/searchInput';
import getAllTransactions from '../../../requests/allTransactions';
import PrimaryButton from '../../buttons/primaryButton';
import { useSession } from 'next-auth/react';

function finalTransactions() {
  const [finalTransactions, setFinalTransactions] = useState<TransactionInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = 10;
  const [searchByMechanic, setSearchByMechanic] = useState<SearchParameters>({
    dni_or_name: "",
    from_date: '',
    to_date: '',
  });
  
  const [searchByClient, setSearchByClient] = useState<SearchParameters>({
    dni_or_name: "",
    from_date: '',
    to_date: '',
  });
  const [ranged, setRanged] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionInterface[]>([]);
  const {data: session} = useSession();

  // Cuando monta el componente //
  useEffect(() => {
    async function fetchData() {
      try {
        const transList = await getAllTransactions(session?.user.token);
        const finalTransList = transList.filter((transaction: TransactionInterface) => transaction.isFinalCustomerTransaction === true); 
        setFinalTransactions(finalTransList); 
        
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);
  
  const loadMore = async () => {
    try {
      const next = await getAllTransactions(session?.user.token, pagination, currentPage * pagination);
      setFinalTransactions((prevTransactions) => [...prevTransactions, ...next]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error al cargar la siguiente página", error);
    }
  };
  
  const searchMechanic = async () => {
    try {
      const parameters: SearchParameters = {
        dni_or_name: searchByMechanic.dni_or_name,
        from_date: searchByMechanic.from_date || undefined,  
        to_date: searchByMechanic.to_date || undefined,      
      };
      
      const mechanic = await filterByMechanic(session?.user.token, parameters);
      const filtered = mechanic.filter((transaction) => transaction.status === true);
      
      setFilteredTransactions(filtered);
    } catch (error) {
      console.error("Error en búsqueda de mecánico", error);
    }
  };
  
  const dateRange = (range: any) => {  
    setRanged(range)
    const startDate = range[0];
    const endDate = range[1];
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();
     
    setSearchByClient(prevState => ({...prevState, from_date: formattedStartDate}));
    setSearchByMechanic(prevState => ({...prevState, from_date: formattedStartDate}));
    setSearchByClient(prevState => ({...prevState, to_date: formattedEndDate}));
    setSearchByMechanic(prevState => ({...prevState, to_date: formattedEndDate}));
}

  const searchClient = async () => {
    try {
      const parameters: SearchParameters = {
        dni_or_name: searchByClient.dni_or_name,
        from_date: searchByClient.from_date || undefined,  
        to_date: searchByClient.to_date || undefined,      
      };
      
      const client = await filterByFinalCustomer(session?.user.token, parameters);
      const filtered = client.filter((transaction) => transaction.status === true);
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
  : finalTransactions;

  
    return (
      <div className='w-full mb-24'>
        <div className='flex items-center w-full'>
          <div className="flex justify-center mt-12 w-7/12">
            <DateRange value={ranged}
            onChangeFunction={dateRange} />
          </div>
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
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <RenderResult data={transactionShow} setFinalTransactions={setFinalTransactions} eliminar='Eliminar'/>
                <div className="flex items-center justify-center space-x-4">
                  <PrimaryButton title='Cargar más' onClickfunction={loadMore}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default finalTransactions;