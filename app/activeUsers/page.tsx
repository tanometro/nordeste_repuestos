"use client";

import Header from "@/components/header";
import List from "@/components/lists";
import { useEffect, useState } from "react";
import getAllUsers from "@/components/requests/getAllUsers";
import deleteUser from "@/components/requests/deleteUser";
import { useRouter } from "next/navigation";
import { UserInterface } from "@/components/interfaces";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setCurrentPage, setSearchResults } from "@/redux/features/paginationSlice";


export default function Users(){
  // const users = useAppSelector(state => state.userReducer.users)
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  // const [currentPage, setCurrentPage] = useState(0);
  const pagination = useAppSelector(state => state.paginationReducer.usersPorPage);
  const currentPage = useAppSelector(state => state.paginationReducer.currentPage);


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

// Paginación para mostrar en la pagina actual
const startIndex = (currentPage - 1) * pagination;
const endIndex = startIndex + pagination;

// Filtrado de usuarios //

const filteredUsers = users.filter((user) => {
  const lowercaseSearchTerm = search.toLowerCase();
  return (
    (user.dni && user.dni.toLowerCase().includes(lowercaseSearchTerm)) ||
    (user.name && user.name.toLowerCase().includes(lowercaseSearchTerm))
  );
});

//Filtrado segun pagina actual
const userToDisplay = filteredUsers.slice(startIndex, endIndex)


const userActive = filteredUsers.filter((user) => user.isActive == true)

//Paginación

   const nextPage = () => {
    if(users.filter(us => us.name.includes(search)).length > currentPage + pagination ){
      setCurrentPage(currentPage + pagination)
    };   };

   const prevPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - pagination)
    }
   }

   const searchUser = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentPage(0)); 
    setSearch(target.value);
    dispatch(setSearchResults(filteredUsers)); 
  };
  

  const totalPage = search.length > 0
  ? Math.ceil(filteredUsers.length / pagination)
  : Math.ceil(users.length / pagination);

const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

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
                      <th className="">Nombre</th>
                      <th className="">Dni</th>
                      <th className="">Tipo</th>
                      <th className="">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                  {userActive.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="">{user.name}</td>
                <td className="px-5">{user.dni}</td>
                <td className="px-5"> {user.roleId === 1 ? 'SúperAdmin' : user.roleId === 2 ? 'Admin' : user.roleId === 3 ? 'Mecánico' : ''}</td>
                <td className="px-5"> {user.roleId === 1 || user.roleId === 2 ? 'Sin saldo' : user.roleId === 3 && user.balance === 0 ? '0' : user.balance}</td>
                <td>
                  <button onClick={() => router.push(`/editUser/${user.id}`)}>
                    <a className="text-blue-500 px-3">Ver usuario</a>
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteUser(user.id, setUsers)}>
                    <a className="text-blue-500 px-3">Desactivar</a>
                  </button>
                </td>
              </tr>
                ))}
                  </tbody>
                </table>
              </List>
              <div className="flex items-center justify-center mt-6 space-x-4">
              <button
                type="button"
                onClick={prevPage}
                className="w-24 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Anteriores
              </button>
              <div className='text-black flex items-center'>
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className="text-red mx-2"
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={nextPage}
                className="w-24 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Siguientes
              </button>
            </div>

                <div className="flex mx-4">
                  <button type="button" onClick={() => router.push('/createUsers')} 
                  className="w-48 mt-6 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Crear nuevo usuario
                  </button>
                  <button type="button" onClick={() => router.push('/deactivatedUsers')} 
                  className="mx-12 w-48 mt-6 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Usuarios eliminados
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
