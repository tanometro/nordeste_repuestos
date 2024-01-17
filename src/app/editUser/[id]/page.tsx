'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { redirect, useParams, useRouter } from 'next/navigation';
import getOneUser from '@/src/components/requests/getOneuser';
import patchUser from '@/src/components/requests/patchUser';
import deleteTransaction from '@/src/components/requests/deleteTransaction';
import Header from '@/src/components/header';
import filterByMechanic from '@/src/components/requests/filterByMechanic';
import { TransactionInterface } from '@/src/components/interfaces';
import { isAuthenticated } from '../../AuthWellDone';

export default function EditUserForm() {
  useLayoutEffect(() => {
    const isAuth = isAuthenticated;
    if (!isAuth) {
      redirect("/Unauthorized")
    }
  }, [])


  const params = useParams();
  const userId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id, 10);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    dni: "",
    username: "",
    password: "",
    name: "",
    roleId: 0,
    commission: null,
    balance: null,
    id: 0,
    isActive: true,
  });


  const [transactions, setTransactions] = useState<TransactionInterface[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getOneUser(userId);
        const transactions = await filterByMechanic(userId);
        setUserData(user);
        setTransactions(transactions);
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.FormEvent) => {
    const property = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;

    setUserData({ ...userData, [property]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patchUser(userData);
    router.push('/allUsers')
  };

  return (
    <div>
      {
        isEditing ? (
          <Header title="Editando usuario" />
        )
          : (
            <Header title="Detalle de usuario" />
          )
      }
      <div className="flex justify-center items-center">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2 mt-12">
            <label className="text-clip text-black">Nombre:</label>
            <input
              name="name"
              placeholder="Nombre"
              className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
              value={userData.name}
              onChange={handleChange}
              required
            />
            <label className="text-clip text-black">Username:</label>
            <input
              name="username"
              placeholder="Username"
              className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
              value={userData.username}
              onChange={handleChange}
              required
            />
            <label className="text-clip text-black">DNI:</label>
            <input
              name="dni"
              type="number"
              placeholder="DNI" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
              value={userData.dni}
              onChange={handleChange}
              required
            />
            <label className="text-clip text-black">Password:</label>
            <input
              name="password"
              placeholder="Contraseña" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
              value={userData.password}
              onChange={handleChange}
              required
            />
            {
              userData.roleId == 3 ? (
                <div>
                  <label className="text-clip text-black">Comisión %:</label>
                  <input
                    name="commission"
                    placeholder="Comisión %" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
                    value={userData.commission || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              ) : null
            }

            <button
              className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit">
              Guardar
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center w-1/2">
            {isEditing ? (
              <h1 className="text-center text-black mb-4">Editando el usuario {userData.name}</h1>
            ) :
              (
                <h1 className="text-center text-black mb-4">Detalle del usuario {userData.name}</h1>
              )}
            <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Nombre: {userData.name}</h1>
            <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">ID: {userData.id}</h1>
            <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Username: {userData.username}</h1>
            {userData.roleId == 3 ? (
              <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Saldo: {userData.balance}</h1>
            ) : ""
            }
            <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">
              Rol: {userData.roleId == 1 ? "SúperAdmin" : userData.roleId == 2 ? "Admin" : userData.roleId == 3 ? "Mecánico" : ""}</h1>
            <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Dni: {userData.dni}</h1>
            <h1 className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4">Comisión: {userData.commission ? `${userData.commission * 100}%` : "No tiene comisiones"}</h1>
            <button
              className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={handleEditClick}>
              Editar
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <h3 className="mt-14 text-3xl font-bold mb-1 text-black">Transacciones del usuario</h3>
      </div>
      <div>
        <div className="flex items-center justify-center mt-1 p-8 ">
          <div className="shadow-xl rounded-2xl border-custom-red border-2 p-8 text-black">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Número</th>
                  <th scope="col" className="px-6 py-4">Cliente</th>
                  <th scope="col" className="px-6 py-4">Fecha</th>
                  <th scope="col" className="px-6 py-4">Total</th>
                  <th scope="col" className="px-6 py-4">Comisión</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-base">{transaction.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">
                      {transaction.isFinalCustomerTransaction == true ? transaction.finalCustomerName : "Intercambio"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">{new Date(transaction.created).toLocaleDateString()}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">
                      {transaction.isFinalCustomerTransaction == true ? transaction.saleTotalAmount : `-${transaction.saleTotalAmount}`}$
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-base">{transaction.saleCommissionedAmount}$</td>
                    <td>
                      <button onClick={() => router.push(`/detailtransaction/${transaction.id}`)}>
                        <a className="text-custom-red px-3">Ver detalles</a>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteTransaction(transaction.id, setTransactions)}>
                        <a className="text-custom-red px-3">Eliminar</a>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

