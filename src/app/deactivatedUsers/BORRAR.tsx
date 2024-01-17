"use client";

import Header from "@/src/components/header";
import List from "@/src/components/lists";
import { useEffect, useLayoutEffect, useState } from "react";
import getAllUsers from "@/src/components/requests/getAllUsers";
import activateUser from "@/src/components/requests/activateUser";
import { redirect, useRouter } from "next/navigation";
import { UserInterface } from "@/src/components/interfaces";
import { isAuthenticated } from "../AuthWellDone";
// import { useAppSelector } from "@/redux/hooks";


interface User {
  name: string;
  dni: string;
  isActive: boolean;
  id: number, 
  balance: number,
  roleId: number,
}

export default function Users(){
  useLayoutEffect(() => {
    const isAuth = isAuthenticated;
    if (!isAuth) {
      redirect("/Unauthorized")
    }
  }, [])

  
  // const users = useAppSelector(state => state.userReducer.users)
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  const valorPaginacion = 10;

// Cuando monta el componente //
  useEffect(() => {
    async function fetchData() {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error en render componente", error);
      }
    }
    fetchData();
  }, []);


 // Filtrado de usuarios //

const filteredUsers = users.filter((user) => {
  const lowercaseSearchTerm = search.toLowerCase();
  return (
    (user.dni && user.dni.toLowerCase().includes(lowercaseSearchTerm)) ||
    (user.name && user.name.toLowerCase().includes(lowercaseSearchTerm))
  );
});

const userActive = filteredUsers.filter((user) => user.isActive == false)

//Paginación

   const nextPage = () => {
    if(users.filter(us => us.name.includes(search)).length > currentPage + valorPaginacion ){
      setCurrentPage(currentPage + valorPaginacion)
    };   };

   const prevPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - valorPaginacion)
    }
    
   }

   const searchUser = ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearch(target.value)
   }

    return (
        <div>
          <Header title="Usuarios"/>
            <div className="flex flex-col items-center h-screen">
              <div className="flex justify-center mt-12 w-1/2">
                  <input 
                  className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
                  placeholder="Busca por NOMBRE o DNI"
                  type="text"
                  value={search}
                  onChange={searchUser}
                  />
              </div>
              <List>
                <table cellSpacing="10">
                  <thead>
                    <tr className="border-b border-gray">
                      <th className="px-5">Nombre</th>
                      <th className="px-5">Dni</th>
                      <th className="px-5">Tipo</th>
                      <th className="px-5">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
          {userActive.map((user, index) => (
      <tr key={index} className="hover:bg-gray-100">
        <td className="">{user.name}</td>
            <td className="">{user.dni}</td>
            <td className=""> {user.roleId === 1 ? 'SúperAdmin' : user.roleId === 2 ? 'Admin' : user.roleId === 3 ? 'Mecánico' : ''}</td>
            <td className=""> {user.roleId === 1 || user.roleId === 2 ? 'Sin saldo' : user.roleId === 3 && user.balance === 0 ? '0' : user.balance}</td>
            <td>
              <button onClick={() => router.push(`/editUser/${user.id}`)}>
                <a className="text-blue-500 px-3">Ver usuario</a>
              </button>
            </td>
            <td>
              <button onClick={() => activateUser(user.id, setUsers)}>
                <a className="text-blue-500 px-3">Re activar</a>
              </button>
            </td>
        </tr>
        ))}
    </tbody>
                </table>
              </List>
                <div className="flex flex-end mx-4 w-1/3 ">
                  <button type="button" onClick={prevPage} 
                    className="w-24 mt-6 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Anteriores
                  </button>
                  <button type="button" onClick={nextPage} 
                    className="w-24 mt-6 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Siguientes
                  </button>
                </div>
                <div className="flex mx-4">
                  <button type="button" onClick={() => router.push('/createUsers')} 
                  className="w-48 mt-6 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Crear nuevo usuario
                  </button>
                  <button type="button" onClick={() => router.push('/activeUsers')} 
                  className="w-48 mt-6 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Usuarios activos
                  </button>
                  <button type="button" onClick={() => router.push('/dashboard')} 
                  className="w-48 mt-6 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Ir al inicio
                  </button>
                </div>
            </div>
        </div>
    )
}
