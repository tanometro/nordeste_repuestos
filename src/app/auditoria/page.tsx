'use client';

import React, {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
import Header from '@/src/components/header';
import List from "@/src/components/lists";
import filterByMechanic from "@/src/requests/filterByMechanic";
import { BalanceListInterface } from '@/src/types/interfaces';
import balanceList from '@/src/requests/balanceList';
import EditButton from '@/src/components/buttons/editButton';
import { useSession } from 'next-auth/react';

const Auditoría = () => {
    const [balances, setBalances]= useState<BalanceListInterface[]>([])
    const [date, setDate] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter();
    const [searchByMechanic, setSearchByMechanic] = useState<string>("");
    const {data: session} = useSession();

    useEffect(() => {
        async function fetchData() {
          try {
            const getAllBalances = await balanceList(session?.user.token);
            setBalances(getAllBalances);
            
          } catch (error) {
            console.error("Error:", error);
          }
        }
      
        fetchData();
      }, [session?.user.token]);
    
    const searchMechanic = async ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearchByMechanic(target.value);
      let parameters = {
        dni_or_name: searchByMechanic,
        sessionToken: session?.user?.token
      }
      const mechanic = await filterByMechanic(session?.user.token, parameters);
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
              {balances.map((user) => (
                <tr key={user.id} 
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{user.transactionId}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.userName}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.userDni}</td>
                    <td className="whitespace-nowrap px-6 py-4">{new Date(user.created).toLocaleDateString()}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.previousBalance}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.currentBalance}</td>
                    <td className="whitespace-nowrap px-6 py-4"> {user.userCommissionAtTheTime}</td>
                    <td>
                      <EditButton title='Ver registro' onClickfunction={() => router.push(`/detailBalance/${user.id}`)}/>
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