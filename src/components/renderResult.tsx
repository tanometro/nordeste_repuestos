import React from 'react';
import { RenderProps } from '../types/interfaces';
import EditButton from './buttons/editButton';
import deleteTransaction from '../requests/deleteTransaction';
import { useRouter } from 'next/navigation';
import List from './lists';
import { useSession } from 'next-auth/react';

function RenderResult(props: RenderProps) {
    const {data, setFinalTransactions, eliminar} = props;
    const {data: session} = useSession();

    const router = useRouter();

        return (
          <List>
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
              {data.map((transaction) => (
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
                  <td>
                    <EditButton
                      title={eliminar}
                      onClickfunction={() => {
                        if (setFinalTransactions) {
                          deleteTransaction(session?.user.token, transaction.id, setFinalTransactions);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </List>
        
            )
 }

export default RenderResult;