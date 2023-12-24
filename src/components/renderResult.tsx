import React from 'react';
import { RenderProps } from './interfaces';
import EditButton from './buttons/editButton';
import deleteTransaction from './requests/deleteTransaction';
import { useRouter } from 'next/navigation';

function RenderResult(props: RenderProps) {
    const {data, filtered, setFinalTransactions, searchByClient, searchByMechanic} = props;
    const router = useRouter();

    if(searchByClient || searchByMechanic){
        return (
            <>
                 {filtered.map((transaction) => (
                    <tr key={transaction.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-100">
                        <td className="whitespace-nowrap px-6 py-4 text-base font-medium">{transaction.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedDni}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.finalCustomerName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleTotalAmount}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleCommissionedAmount}</td>
                        <td>
                          <EditButton title='Ver detalles' onClickfunction={() => router.push(`/detailtransaction/${transaction.id}`)}/>
                        </td>
                        <td>
                          <EditButton title='Eliminar' onClickfunction={() => deleteTransaction(transaction.id, setFinalTransactions)}/>
                        </td>  
                    </tr>
                      ))}
            </>
            )
    }
    else {
        return (
            <>
                 {data.map((transaction) => (
                    <tr key={transaction.id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-100">
                        <td className="whitespace-nowrap px-6 py-4 text-base font-medium">{transaction.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.userAssociatedDni}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.finalCustomerName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleTotalAmount}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-base">${transaction.saleCommissionedAmount}</td>
                        <td>
                          <EditButton title='Ver detalles' onClickfunction={() => router.push(`/detailtransaction/${transaction.id}`)}/>
                        </td>
                        <td>
                          <EditButton title='Eliminar' onClickfunction={() => deleteTransaction(transaction.id, setFinalTransactions)}/>
                        </td>  
                    </tr>
                      ))}
            </>
            )
    }
  
}

export default RenderResult;