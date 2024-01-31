import React, { useEffect } from 'react';
import filterByFinalCustomer from '../../requests/filterByFinalCustomer';
import { FilterByClientProps, TransactionInterface } from '../interfaces';

const FilterByClient: React.FC<FilterByClientProps> = (props) => {
  const { searchClient, searchByClient, setFilteredTransactions } = props;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (searchByClient.trim() === '') {
          setFilteredTransactions([]);
        } else {
          const transactionFind = await filterByFinalCustomer(searchByClient);
          setFilteredTransactions(transactionFind);
        }
      } catch (error) {
        console.error("Error en obtener usuario cliente", error);
      }
    };

    const controller = new AbortController();
    fetchTransactions();

    return () => {
      controller.abort();
    };

  }, [searchByClient, setFilteredTransactions]);

  return (
    <div className="flex justify-center mt-12 w-7/12">
      <input
        className="rounded-2xl border border-custom-red h-10 w-8/12 text-center text-black"
        placeholder="Busca por NOMBRE o DNI de cliente"
        type="text"
        value={searchByClient}
        onChange={searchClient}
      />
    </div>
  );
}

export default FilterByClient;