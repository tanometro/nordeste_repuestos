'use client';

import React, {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
import Header from '@/src/components/header';
import List from "@/src/components/lists";
import filterByMechanic from "@/src/components/requests/filterByMechanic";
import { BalanceListInterface } from '@/src/components/interfaces';
import balanceList from '@/src/components/requests/balanceList';


const Auditoría = () => {
    const [balances, setBalances]= useState<BalanceListInterface[]>([])
    const [date, setDate] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();
    const [searchByMechanic, setSearchByMechanic] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
          try {
            const getAllBalances = await balanceList();
            setBalances(getAllBalances);
            
          } catch (error) {
            console.error("Error:", error);
          }
        }
      
        fetchData();
      }, []);
    
    const searchMechanic = async ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearchByMechanic(target.value);
      const mechanic = await filterByMechanic(searchByMechanic);
   }
    
    const searchDate = ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setDate(target.value);
    }

  return (
    <div>
       <Header title='Auditoría de transacciones'/>
   
    <div className="flex flex-col items-center">
        <div className="flex justify-center mt-6 w-full">
            <input 
              className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
              placeholder="Busca por NOMBRE o DNI de mecánico"
              type="text"
              value={searchByMechanic}
              onChange={searchMechanic}
            />
        </div>
        <List>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Número</th>
                  <th scope="col" className="px-6 py-4">Nombre</th>
                  <th scope="col" className="px-6 py-4">DNI</th>
                  <th scope="col" className="px-6 py-4">Fecha</th>
                  <th scope="col" className="px-6 py-4">Saldo anterior</th>
                  <th scope="col" className="px-6 py-4">Saldo posterior</th>
                  <th scope="col" className="px-6 py-4">Comisión</th>
                </tr>
              </thead>
              <tbody>
              {balances.map((user, index) => (
                <tr key={index} 
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{user.transactionId}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.userName}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.userDni}</td>
                    <td className="whitespace-nowrap px-6 py-4">{new Date(user.created).toLocaleDateString()}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.previousBalance}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.currentBalance}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.userCommissionAtTheTime}</td>
                    <td>
                        <button onClick={() => router.push(`/detailBalance/${user.id}`)}>
                            <a className="text-custom-red px-3">Ver registro</a>
                        </button>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
        </List>
  </div>
  </div>
  )
}

export default Auditoría;