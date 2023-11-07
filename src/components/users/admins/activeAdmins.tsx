"use client";

import List from "@/src/components/lists";
import { useState } from "react";
import deleteUser from "@/src/components/requests/deleteUser";
import { useRouter } from "next/navigation";
import { UserInterface, ActiveAdminsProps } from "@/src/components/interfaces";
import { useAppSelector, useAppDispatch } from "@/src/app/redux/hooks";
import { setCurrentPage, setSearchResults } from "@/src/app/redux/features/paginationSlice";


const ActiveAdmins: React.FC<ActiveAdminsProps> = (props) => {
  const {admins, setAdmins} = props;
  // const users = useAppSelector(state => state.userReducer.users)
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const router = useRouter();
  // const [currentPage, setCurrentPage] = useState(0);
  const pagination = useAppSelector(state => state.paginationReducer.usersPorPage);
  const currentPage = useAppSelector(state => state.paginationReducer.currentPage);


// Paginación para mostrar en la pagina actual
const startIndex = (currentPage - 1) * pagination;
const endIndex = startIndex + pagination;

// Filtrado de usuarios //
const filteredUsers = admins.filter((user) => {
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
    if(admins.filter(us => us.name.includes(search)).length > currentPage + pagination ){
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
  : Math.ceil(admins.length / pagination);

const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center mt-6 w-full">
                  <input 
                  className="rounded-2xl border border-custom-red w-1/2 text-center text-black"
                  placeholder="Busca por NOMBRE o DNI"
                  type="text"
                  value={search}
                  onChange={searchUser}
                  />
              </div>
              <List>
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">Nombre</th>
                        <th scope="col" className="px-6 py-4">DNI</th>
                        <th scope="col" className="px-6 py-4">Tipo</th>
                        <th scope="col" className="px-6 py-4">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                  {userActive.map((user, index) => (
              <tr key={index} 
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-200">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.dni}</td>
                <td className="whitespace-nowrap px-6 py-4"> {user.roleId === 1 ? 'SúperAdmin' : user.roleId === 2 ? 'Admin' : user.roleId === 3 ? 'Mecánico' : ''}</td>
                <td className="whitespace-nowrap px-6 py-4"> {user.roleId === 1 || user.roleId === 2 ? 'Sin saldo' : user.roleId === 3 && user.balance === 0 ? '0' : user.balance}</td>
                <td>
                  <button onClick={() => router.push(`/editUser/${user.id}`)}>
                    <a className="text-custom-red px-3">Ver usuario</a>
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteUser(user.id, setAdmins)}>
                    <a className="text-custom-red px-3">Desactivar</a>
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
      </div>
    )
}

export default ActiveAdmins;