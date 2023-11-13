'use client';
import React from 'react'
import filterByMechanic from '../requests/filterByMechanic';
import { FilterByMechanicsProps } from '../interfaces';
import { useEffect } from 'react';

const FilterByMechanic: React.FC<FilterByMechanicsProps> = (props) => {
  const { searchMechanic, filteredTransactions, searchByMechanic, setFilteredTransactions } = props;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (searchByMechanic.trim() !== '') {
          const transactionFind = await filterByMechanic(searchByMechanic);
          setFilteredTransactions(transactionFind);
        } else {
          setFilteredTransactions([]);
        }
      } catch (error) {
        console.error("Error en obtener usuario mecánico", error);
      }
    };

    const controller = new AbortController();

    fetchTransactions();

    return () => {
      controller.abort();
    };

  }, [searchByMechanic, setFilteredTransactions]);

  useEffect(() => {
  }, [filteredTransactions]);

  return (
    <div className="flex justify-center mt-12 w-7/12">
      <input
        className="rounded-2xl border border-custom-red h-10 w-8/12 text-center text-black"
        placeholder="Busca por NOMBRE o DNI de mecánico"
        type="text"
        value={searchByMechanic}
        onChange={searchMechanic}
      />
    </div>
  );
}

export default FilterByMechanic;