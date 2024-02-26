import React, { useEffect } from 'react';
import filterByFinalCustomer from '../../requests/filterByFinalCustomer';
import { FilterByClientProps } from '../../types/interfaces';
import { useSession } from 'next-auth/react';

const FilterByClient: React.FC<FilterByClientProps> = (props) => {
  const { searchClient, searchByClient, setFilteredTransactions } = props;
  const {data: session} = useSession();

  useEffect(() => {
    let parameters = {
      dni_or_name: searchByClient,
      token: session?.user.token,
    }
    const fetchTransactions = async () => {
      try {
        if (searchByClient.trim() === '') {
          setFilteredTransactions([]);
        } else {
          const transactionFind = await filterByFinalCustomer(session?.user.token, parameters);
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

  }, [session?.user.token, searchByClient, setFilteredTransactions]);

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