"use client";

import List from "@/src/components/lists";
import { useEffect, useState } from "react";
import activateUser from "@/src/components/requests/activateUser";
import { useRouter } from "next/navigation";
import { UserInterface, ActiveMechanicsProps } from "@/src/components/interfaces";
// import { useAppSelector } from "@/redux/hooks";

const InactiveMechanics: React.FC<ActiveMechanicsProps> = (props) => {
  const {mechanics, setMechanics} = props;
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

 // Filtrado de usuarios //

const filteredUsers = mechanics.filter((user) => {
  const lowercaseSearchTerm = search.toLowerCase();
  return (
    (user.dni && user.dni.toLowerCase().includes(lowercaseSearchTerm)) ||
    (user.name && user.name.toLowerCase().includes(lowercaseSearchTerm))
  );
});

  //Paginación
  const userActive = filteredUsers.filter((user) => user.isActive == false);
  const userShow = userActive.slice(firstIndex, lastIndex);
  const npage = Math.ceil(userActive.length / recordsPerPage);
  const numbers: number[] = [];
    for (let i = 1; i <= npage; i++) {
      numbers.push(i);
  }
  const prevPage = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }; 

  const nextPage = () => {
    if(currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  };

  const changePage = (id: number) => {
    setCurrentPage(id)
  };


   const searchUser = ({target}: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(0);
      setSearch(target.value)
   }

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
                  {userShow.map((user, index) => (
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
                        <button onClick={() => activateUser(user.id, setMechanics)}>
                          <a className="text-blue-500 px-3">Re activar</a>
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
              {
                numbers.map((n, i) => (
                  <div className='text-black flex items-center'>
                    <button
                      key={i}
                      onClick={() => changePage(n)}
                      className="text-red mx-2"
                    >
                      {n}
                    </button>
                  </div>
                ))
              }
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

export default InactiveMechanics;